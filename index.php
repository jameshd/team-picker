<html ng-app="TeamPicker">
<head>
    <title>Team Picker</title>
    <link rel="stylesheet" href="externals/foundation/css/foundation.min.css">
    <style>
        body {
            padding: 0;
            margin: 0;
            background: #4D7E01 url('externals/img/football-compact.jpg') no-repeat ;
            background-size: cover;
        }

        textarea {
            min-height: 250px;
        }

        ul {
            list-style-type: none;
        }
        li {
            height: 48px;
            font-size: 24px;
            font-family: sans-serif;
        }
        .heading > *{
            text-align: center;
            color: black;
        }

    </style>
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="heading large-12 column">
                <h2>Team Picker</h2>
                <p>Can't decide on who to pick?</p>
            </div>
        </div>

        <div class="row">
            <div class="large-12 column">
                <div class="alert label clear" ng-model="errorText" ng-show="errorText">{{errorText}}</div>
            </div>
        </div>

        <div class="row team-picker" ng-controller="TeamPickerCtrl">
            <div class="columns large-3">&nbsp;</div>
            <div class="columns large-6">
                <form ng-submit="splitPlayers()">
                    <textarea ng-model="playerNames" required placeholder="One player per line..."></textarea>
                    <input class="button radius" id="split-teams" type="submit" value="Split em up!" />
                    <span team-counter id="team-counter"></span>
                </form>
                <div ng-show="teamOne.length && teamTwo.length" class="teams">
                    <div class="row">
                        <div class="columns large-6">
                            <h4>Reds</h4>
                            <ul class="team-one">
                                <li class="player" ng-repeat="player in teamOne">
                                    <img src="externals/img/red-shirt.png" alt="Reds">
                                    {{player}}
                                </li>
                            </ul>
                        </div>

                        <div class="columns large-6">
                            <h4>Blues</h4>
                            <ul ng-show="teamTwo.length" class="team-two">
                                <li class="player" ng-repeat="player in teamTwo">
                                    <img src="externals/img/blue-shirt.png" alt="Blues">
                                    {{player}}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="large-3 columns">&nbsp;</div>
        </div>
    </div>
    <script src="lib/angular.min.js" type="text/javascript"></script>
    <script src="lib/app.js" type="text/javascript" charset="utf-8"></script>
</body>
</html>