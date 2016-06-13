var request = require('request');
var actions = require('./actions.js');
var intentParser = {};

const MY_WIT_TOKEN = process.env.MY_WIT_TOKEN;
intentParser.parseMessage = function(text,sender){
request({
    url: 'https://api.wit.ai/message',
    qs:{'access_token' : MY_WIT_TOKEN,
           'q': text
        },
    method: 'GET',
},function (error,response,body) {
    var reply = "Welcome";
    actions.sendTextMessage(sender,reply);
});
}



module.exports = intentParser;