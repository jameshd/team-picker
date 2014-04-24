var IndexPage = require('./indexPage');

describe("Team Counter", function () {
    var TeamPicker = new IndexPage;

    beforeEach(function () {
        TeamPicker.get();
        TeamPicker.addPlayers(6);
    });

    it("Should play nicely with other modules", function() {
        TeamPicker.teamCountMessage.getText().then(function (text) {
            expect(text).toBe("2 teams with 3 players");
        });
    });
});