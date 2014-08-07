'use strict';

angular.module('core').directive('teamCounter', [
	function() {
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
	}
]);