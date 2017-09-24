'use strict';

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'))
app.use(require(__dirname + '/public/controller'));

app.listen(3000,function(){
	console.log('listening on port 3000');
	console.log(__dirname + '/public');
})