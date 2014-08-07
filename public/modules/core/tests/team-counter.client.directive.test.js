describe("Team Counter", function() {

    var element,
        theSpan,
        scope,
        $compile,
        inputPlayers = function(howMany) {
            var players = [];
            for (var i = 0; i < howMany; i++) {
                players.push('Player ' + i);
            }

            return players;
        };

    beforeEach(module(ApplicationConfiguration.applicationModuleName));


    beforeEach(inject(function(_$compile_, $rootScope) {
        element = angular.element("<div team-counter></div>");
        scope = $rootScope;
        $compile = _$compile_;
    }));

    it("should not appear when less than 4 players", function () {

        scope.players = inputPlayers(2);
        $compile(element)(scope);
        scope.$digest();

        expect(element.hasClass('ng-hide')).toBe(true);
    });

    it("should give correct numbers of teams and players", function() {
        scope.players = inputPlayers(4);
        $compile(element)(scope);
        scope.$digest();

        expect(element.text()).toBe('2 teams with 2 players');
    });


    it("should add ng-hide if no players found", function () {
        scope.players = [];
        $compile(element)(scope);
        scope.$digest();

        expect(element.hasClass('ng-hide')).toBe(true);
    });

    it("should not be greater then 11 players per side", function () {
        scope.players = inputPlayers(24);
        $compile(element)(scope);
        scope.$digest();

        expect(element.text()).toBe("2 teams with 12 players");
        expect(scope.errorText).toBe("You've got a lot of mates! Playing Subs?");
    });


    it("should only update when the number of players are even", function () {
        scope.players = inputPlayers(7);
        $compile(element)(scope);
        scope.$digest();

        expect(element.text()).toBe("2 teams with 3.5 players");
        expect(element.hasClass('ng-hide')).toBe(true);
    });


    it("should only appear when teams are even", function () {
        scope.players = inputPlayers(6);
        $compile(element)(scope);
        scope.$digest();

        expect(element.hasClass('ng-hide')).toBe(false);
        scope.players.pop();
        scope.$digest();

        expect(element.hasClass('ng-hide')).toBe(true);
    });
});