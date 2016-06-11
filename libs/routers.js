var express = require('express');
var bodyParser = require('./bodyParser.js');
var actions = require('./actions.js');
var intentParser = require('./intentParser.js');

const AUTH_TOKEN = process.env.AUTH_TOKEN;

var app = express();
app.use(bodyParser);

app.get('/webhook/', function(req, res) {
    if (req.query['hub.verify_token'] === AUTH_TOKEN)
        res.send(req.query['hub.challenge']);
    res.send('Error, wrong validation token');
});


app.post('/webhook', function(req, res) {
    var data = JSON.parse(Object.keys(req.body)[0]);
    var entry = data.entry[0];
    var messagingEvents = entry.messaging;

    for (var index = 0; index < messagingEvents.length; index++) {
        var event = entry.messaging[index];
        var sender = event.sender.id;
        if (event.message && event.message.text) {
            var text = event.message.text;
            console.log("LOG: Message",text);
            var reply = intentParser.parseMessage(text);
            actions.sendTextMessage(sender,reply);
        }
    }
    res.sendStatus(200);
});

app.get('/policy.html',function(req,res){
     res.sendStatus(200);
});

module.exports = app;
