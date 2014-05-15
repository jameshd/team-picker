var IndexPage = require('./indexPage');

describe("Team Picker Generic Functions", function() {
    var ptor = protractor.getInstance(),
        TeamPicker = new IndexPage();


    beforeEach(function () {
        TeamPicker.get();
    });

    describe("General Labeling", function() {
        it("should load the team picker page", function() {
            TeamPicker.heading.getText().then(function(text) {
                expect(text).toBe('Team Picker');
            });

        }, 10000);

    });


    describe("submitting players", function(){
        var teams;

        beforeEach(function () {
            TeamPicker.addPlayers(10);
            TeamPicker.splitButton.click();
        });

        it("should show two teams when given players",function(){
            teams = ptor.findElements(By.css('.teams ul')).then(function (teams) {
                expect(teams[0].isDisplayed()).toBe(true);
                expect(teams[1].isDisplayed()).toBe(true);
            });
        });


        iit("should produce two lists of five players",function(){
            ptor.findElements(By.css('.team-one li')).then(function (listItems) {
                expect(listItems.length).toEqual(5);
            });

            ptor.findElements(By.css('.team-two li')).then(function (listItems) {
                expect(listItems.length).toEqual(5);
            });
        });

    });
});