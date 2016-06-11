var request = require('request');

const PAGE_TOKEN = process.env.PAGE_TOKEN;

var actions = {};
actions.sendTextMessage = function(sender, text) {
    var messageHead = {
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token : PAGE_TOKEN},
        method: 'POST',
        json: {
            recipient: {id : sender},
            message: {text : text},
        }
    }
    request(messageHead, errorHandler);
};

var errorHandler = function(error, response, body) {
    if(error)
        console.log('Error sending message: ', error);
    else if (response.body.error)
        console.log('Error: ', response.body.error);
}

var processMessage = function(text) {
    return "You are Welcome";
}

module.exports = actions;
