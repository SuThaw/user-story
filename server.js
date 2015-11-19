var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');


var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan());

mongoose.connect(config.database,function(err){
	if(err){
		console.log(err);
	}else{
		console.log('database connected');
	}
});

app.get('*',function(req,res,next){
	return res.sendFile(__dirname + '/public/views/index.html');
});

app.listen(config.port,function(){
	console.log('server is listening at ' + '3000');
});