var express = require('express');
var app = express();
var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/team-picker');
// var db = mongoose.connection;

// db.on('error', function callback () {
//   console.log("Connection error");
// });

// db.once('open', function callback () {
//   console.log("Mongo working!");
// });


var mockPlayerData = [
    'James',
    'Alex',
    'Adam',
    'Will',
    'Keith',
    'David',
    'Steve',
    'Mike B',
    'Mike P'
];

app.put('/players/:sessionkey', function (req, res) {
    if (req.query.players) {
        console.log(req.query.players);

        mockPlayerData = mockPlayerData.concat(req.query.players.split(','));
    }

    res.send({
        status: 200,
        data: mockPlayerData
    });
});

app.get('/players/:sessionkey', function (req, res) {
    res.send({
        status: 200,
        data: mockPlayerData
    });
});

app.put('/create-fixture', function(req, res) {
    res.send({
        data:'hello this is server and I am got '+req.params.id
    });
});

app.listen(3000);
console.log('Listening on port 3000...');