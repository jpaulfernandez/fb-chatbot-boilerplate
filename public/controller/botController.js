'use strict';


const express = require('express');
const router = express.Router(),
	  message = require('../model/message.js');


router.get('/', function(req, res){

	res.send(message.message);

});


module.exports = router;
