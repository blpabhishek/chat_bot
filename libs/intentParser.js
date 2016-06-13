var request = require('request');
var intentParser = {};

const MY_WIT_TOKEN = process.env.MY_WIT_TOKEN;
intentParser.parseMessage = function(text,sender,callback){
request({
    url: 'https://api.wit.ai/message',
    qs:{'access_token' : MY_WIT_TOKEN,
           'q': text
        },
    method: 'GET',
},function (error,response,body) {
    console.log(body);
    var reply = "Welcome";
    console.log(callback);
    callback(reply,sender);
});
}

intentParser.parseMessage("Hello");



module.exports = intentParser;