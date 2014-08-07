'use strict';

(function() {
    // Team picker Controller Spec
    describe('Team picker Controller Tests', function() {
        // Initialize global variables
        var TeamPickerController,
            scope,
            $httpBackend,
            $stateParams,
            $location,
            inputPlayers = function(howMany) {
                var players = [];
                for (var i = 0; i < howMany; i++) {
                    players.push('Player ' + i);
                }

                return players;
            };

        // The $resource service augments the response object with methods for updating and deleting the resource.
        // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
        // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
        // When the toEqualData matcher compares two objects, it takes only object properties into
        // account and ignores methods.
        beforeEach(function() {
            jasmine.addMatchers({
                toEqualData: function(util, customEqualityTesters) {
                    return {
                        compare: function(actual, expected) {
                            return {
                                pass: angular.equals(actual, expected)
                            };
                        }
                    };
                }
            });
        });

        // Then we can start by loading the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
        // This allows us to inject a service but then attach it to a variable
        // with the same name as the service.
        beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
            // Set a new global scope
            scope = $rootScope.$new();

            scope.players = [];
            scope.playerNames = "";

            // Point global variables to injected services
            $stateParams = _$stateParams_;
            $httpBackend = _$httpBackend_;
            $location = _$location_;

            // Initialize the Team picker controller.
            TeamPickerController = $controller('TeamPickerController', {
                $scope: scope
            });
        }));

        it("should set the error text when no players inputted", function () {
            scope.playerNames = "Player 1";
            scope.splitPlayers();
            expect(scope.errorText).not.toBe("");
            expect(scope.errorText).toBe("You must enter one player per line");
        });

        it("should be able to handle duplicates without dropping entries", function() {

            scope.playerNames = ['one', 'one', 'two', 'three'].join('\n');

            scope.$apply();

            expect(scope.players.length).toBe(4);
            expect(scope.players).toEqual(['one', 'one', 'two', 'three']);
            scope.splitPlayers();

            expect(scope.teamOne.length + scope.teamTwo.length).toBe(4);
        });
    });
}());