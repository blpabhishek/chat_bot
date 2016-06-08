var express = require('express');
var body_parser = require('./bodyParser.js');
var cookie_parser = require('cookie-parser');
var app = express();

app.use(body_parser);
app.use(cookie_parser());

const TOKEN = "EAAONmOIGzw4BAI4ZBY1u1CkTlVJlxWY66iI9e4ZAXJ0pTuZCfjXWkCCZBVQyke4fzxFMKHdCZBxtdwMSy1gWyPqkIcvt6Y2ngpQPztxEBm1yekcKZCrzKX4WVnZC1CZAob7QyU5Q89SPV3Er6uozmOI5NFdJRMugvVI4MwzdfWvhiwZDZD";

app.get('/webhook/', function(req, res){
    if (req.query['hub.verify_token'] === TOKEN)
        res.send(req.query['hub.challenge']);
    res.send('Error, wrong validation token');
});


app.post('/webhook/', function (req, res) {
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      console.log(text);
    }
  }
  res.sendStatus(200);
});

module.exports = app;