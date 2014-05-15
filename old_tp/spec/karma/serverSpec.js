describe("Server Stuff", function () {
    var appCtrl, scope, mockHttp;

    beforeEach(module('TeamPicker'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
        scope = $rootScope;
        mockHttp = $httpBackend;

        expectedPlayers = ['one', 'two', 'three', 'four'];
        mockHttp.expectGET('/load-fixture/123456').respond(expectedPlayers);

        appCtrl = $controller('TeamPickerCtrl', {
            '$scope' : scope,
            '$http' : mockHttp
        });

    }));

    iit("should be able to load names from the server", function () {
        expect(scope.players).toEqual([]);

        scope.loadPlayers(123456);
        mockHttp.flush();

        expect(scope.players.length).toBe(4);
        expect(scope.players).toEqual(expectedPlayers);
    });

});