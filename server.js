var routers = require('./libs/routers.js');
const PORT = 5000;

routers.listen(process.env.PORT || PORT,function(){
	console.log("listening at port===>"+ PORT);
});
