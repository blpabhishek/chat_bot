var request = require('request');
var intentParser = {};

MY_WIT_TOKEN = process.env.MY_WIT_TOKEN;
intentParser.parseMessage = function(text){
request({
    url: 'https://api.wit.ai/message',
    qs:{'access_token' : MY_WIT_TOKEN,
           'q': text
        },
    method: 'GET',
},function (error,response,body) {
    console.log(body);
});
    return "Welcome Here";
}

intentParser.parseMessage("Hello");



module.exports = intentParser;