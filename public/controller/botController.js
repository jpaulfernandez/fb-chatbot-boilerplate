//FB CHATBOT BOILERPLATE -JMFernandez 2017
//Github Repository: 

'use strict';

//Import Dependecies
const express = require('express');
const router = express.Router(),
	  message = require('../model/message.js'),
	  parameters = require( './../../config/parameters.js'),
	  messageHandler = require('../service/messageHandler.js');

//Test Connection method
///TODO: Delete this method
router.get('/', (req, res) => 
{
	res.status(200).send('Hello');
});

//Webhook Connection through facebook
//local testing run curl -x get "localhost:3000/webhook?hub.verify_token=my_voice_is_my_password_verify_me&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"
//upon deployment
router.get('/webhook', (req, res) => {

	if(req.query['hub.mode'] === 'subscribe' &&
	   req.query['hub.verify_token'] === parameters.validationToken)
	{
		//Send Ok status to facebook to initiate handshake
		res.status(200).send(req.query['hub.challenge']);
		console.log('Success: webhook already connected on facebook');
	}
	else
	{
		//Send Server error status to notify facebook something went wrong upon hooking the link
		console.log('Error: validation token not match');
		res.status(500).send({err: 'Failed Validation. Make sure validation token match'});
	}

});

//Webhook post request handler
//Handle message received and replies
router.post('/webhook', (req, res) => {

	let body = req.body;

	//Body object should be page
	if(body.object === 'page')
	{
		//Hanlde multiple body request
		body.entry.forEach(entry => {

			let webhook_event = entry.messaging[0];

			//Get Fb User Identifier
			let sender_psid = webhook_event.sender.id;

			//log who's the sender, and/or save the sender in the db if not existing
			//TODO: Create a service that will save sender into DB
			console.log(webhook_event.sender);

			//Handle routing of events if message or postback
			//check fb developers documentation for their differences
			if(webhook_event.message)
			{
				//Handle message request
				messageHandler.handleMessage(sender_psid, webhook_event.message);
			}
			else 
			if(webhook_event.postback)
			{
				//Handle postback request sent from a structured message
				messageHandler.handlePostback(sender_psid, webhook_event.postback);
			}

		});

		//Send Ok status to facebook when an event is received
		res.status(200).send('EVENT_RECEIVED');
	}
	else
	{
		//Send not found status to facebook when it has unknown event received
		res.sendStatus(404);
	}
	

});


module.exports = router;
