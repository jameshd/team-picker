describe("Player Entry Form", function () {
    var appCtrl, scope, mockHttp;

    beforeEach(module('TeamPicker'));
    beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
        scope = $rootScope;
        mockHttp = _$httpBackend_;

        scope.players = [];
        scope.playerNames = "";

        appCtrl = $controller('TeamPickerCtrl', {
            '$scope' : scope,
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