var app = angular.module('TeamPicker', []);

app.controller('TeamPickerCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.errorText = "";
    $scope.teamOne = [];
    $scope.teamTwo = [];
    $scope.players = [];
    $scope.playerNames = "";

    $scope.$watch('playerNames', function () {
        // convert to player objects.

        $scope.players = $scope.playerNames.split("\n");
    });

    $scope.splitPlayers = function() {

        var length = $scope.players.length,
            breakPoint = Math.floor(length / 2);

        if (length <= 1) {
            $scope.errorText = "You must enter one player per line";
        } else {
            $scope.players.sort(function() { return 0.5 - Math.random() });

            $scope.teamOne = $scope.players.slice(0, breakPoint);
            $scope.teamTwo = $scope.players.slice(breakPoint);
        }
    }

    $scope.loadPlayers = function (sessionId) {
        $http.get('/load-fixture/' + sessionId).success(function (data) {
            $scope.players = data;
        });
    }
}]);
app.directive('teamCounter', function () {
    return {
        replace: true,
        template: '<span ng-show="shouldShow()">{{numberOfTeams}} teams with {{numberOfPlayers}} players</span>',
        link : function ($scope, element, attrs) {
            $scope.$watch('players', function() {
                if (! $scope.players || $scope.players.length < 4) {
                    $scope.numberOfTeams = 0;
                    return;
                }

                if ($scope.players.length > 22) {
                    $scope.errorText = "You've got a lot of mates! Playing Subs?";
                }

                $scope.numberOfTeams = 2;
                $scope.numberOfPlayers = $scope.players.length / $scope.numberOfTeams;
            });

            $scope.shouldShow = function () {
                return $scope.players.length % 2 == 0 && $scope.numberOfTeams == 2;
            }
        }
    };
});