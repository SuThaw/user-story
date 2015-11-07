var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan());

app.get('*',function(req,res,next){
	return res.sendFile(__dirname + '/public/views/index.html');
});

app.listen(config.port,function(){
	console.log('server is listening at ' + '3000');
});