var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

app.listen(3000,function(){
	console.log('server is listening at ' + '3000');
});