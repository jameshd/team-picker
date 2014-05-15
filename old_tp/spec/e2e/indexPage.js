function IndexPage() {
    this.get = function () {
        console.log('loading...');
        return browser.get('index.html');
    }

    this.heading = element(by.css('.container h2'));
    this.splitButton = element(by.id('split-teams'));

    this.splitPlayersIntoTeams = function () {
        this.splitButton.click();
    }

    this.textArea = element(by.tagName('textarea'));

    this.addPlayers = function  (howMany) {
        var playerList = [],
            c = parseInt(howMany, 10) || 10;

        for (i = 0; i < c; i++) {
            playerList.push('Player ' + i.toString());
        };

        this.textArea.sendKeys(playerList.join("\n"));
    }

    this.teamCountMessage = element(by.id('team-counter'));

};

module.exports = IndexPage;