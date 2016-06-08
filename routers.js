var express = require('express');

var app = express();

const TOKEN = "EAAONmOIGzw4BAI4ZBY1u1CkTlVJlxWY66iI9e4ZAXJ0pTuZCfjXWkCCZBVQyke4fzxFMKHdCZBxtdwMSy1gWyPqkIcvt6Y2ngpQPztxEBm1yekcKZCrzKX4WVnZC1CZAob7QyU5Q89SPV3Er6uozmOI5NFdJRMugvVI4MwzdfWvhiwZDZD";

app.get('/webhook/', function(req, res){
    if (req.query['hub.verify_token'] === TOKEN)
        res.send(req.query['hub.challenge']);
    res.send('Error, wrong validation token');
});

module.exports = app;