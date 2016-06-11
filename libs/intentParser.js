var request = require('request');
var intentParser = {};

const MY_WIT_TOKEN = process.env.MY_WIT_TOKEN;

intentParser.parseMessage = function(text){
request({
    url: 'https://api.wit.ai/message',
    data: {
        'q': text,
        'access_token' : MY_WIT_TOKEN
    },
    dataType: 'jsonp',
    method: 'GET',
    success: function(response) {
      console.log(response);
    }
});
    return "Welcome Here";
}


module.exports = intentParser;