var express = require('express');
var bodyParser = require('./bodyParser.js');
var request = require('request');

const AUTH_TOKEN = process.env.AUTH_TOKEN;
const PAGE_TOKEN = process.env.PAGE_TOKEN;

var app = express();
app.use(bodyParser);


var sendTextMessage = function (sender, text) {
  messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:PAGE_TOKEN},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
};


app.get('/webhook/', function(req, res) {
    console.log('This is the query', req.query);
    if (req.query['hub.verify_token'] === AUTH_TOKEN)
        res.send(req.query['hub.challenge']);
    res.send('Error, wrong validation token');
});


app.post('/webhook', function(req, res) {
  var messageObject = JSON.parse(Object.keys(req.body)[0]);
  var messagingEvents = messageObject.entry[0].messaging;
  for (i = 0; i < messagingEvents.length; i++) {
    event = messageObject.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      console.log("Message:",text);
      sendTextMessage(sender,'I am Bot');
    }
  }
  res.sendStatus(200);
});

module.exports = app;
