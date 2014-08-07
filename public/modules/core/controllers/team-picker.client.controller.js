'use strict';

angular.module('core').controller('TeamPickerController', ['$scope',
	function($scope) {
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

	}
]);