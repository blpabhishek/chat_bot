var express = require('express');
var bodyParser = require('./bodyParser.js');
var actions = require('./actions.js');

const AUTH_TOKEN = process.env.AUTH_TOKEN;

var app = express();
app.use(bodyParser);

app.get('/webhook/', function(req, res) {
    console.log('LOG: This is the query', req.query);
    if (req.query['hub.verify_token'] === AUTH_TOKEN)
        res.send(req.query['hub.challenge']);
    res.send('Error, wrong validation token');
});


app.post('/webhook', function(req, res) {
    var data = JSON.parse(Object.keys(req.body)[0]);
    var messagingEvents = data.entry[0].messaging;

    for (int index = 0; index < messagingEvents.length; index++) {
        var event = data.entry[0].messaging[index];
        var sender = event.sender.id;
        if (event.message && event.message.text) {
            var text = event.message.text;
            console.log("LOG: Message",text);
            actions.sendTextMessage(sender,'I am Bot');
        }
    }
    res.sendStatus(200);
});

module.exports = app;
