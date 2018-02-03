//Don't Edit this file, use only to load all dependecy directories here. 
//Intended to import controllers and model only

'use strict';

const express = require('express'),
	  mongoose = require('mongoose'),
	  app = express(),
	  config = require(__dirname + '/config/parameters.js'), 
	  bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))
app.use(require(__dirname + '/public/controller'));


const listen = () => {
	app.listen(3000,function(){
		console.log('listening on port 3000');
	});
};

const connect = () => {
	let options = { server: { socketOptions: { keepAlive: 1 } } };
  	return mongoose.connect(config.db, options).connection;
};

connect()
	.on('error', console.log)
	.on('disconnect', connect)
	.once('open', listen);
