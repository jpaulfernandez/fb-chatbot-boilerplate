'use strict';


const express = require('express');
const router = express.Router(),
	  message = require('../model/message.js'),
	  parameters = require( './../../config/parameters.js');


router.get('/', function(req, res)
{
	res.status(200).send('Hello');
});

router.get('/webhook', function(req, res){

	if(req.query['hub.mode'] === subscribe &&
	   req.query['hub.verify_token'] === parameters.validationToken)
	{
		res.ok(req.query['hub.challenge']);
	}
	else
	{
		console.log('Error: validation token not match')
		res.status(500).send({err: 'Failed Validation. Make sure validation token match'})
	}

});


module.exports = router;
