var http = require('http');
var routers = require('./routers.js');
const PORT = 5000;

http.createServer(controller).listen(process.env.PORT || PORT,function(){
	console.log("listening at port===>"+ PORT);
});