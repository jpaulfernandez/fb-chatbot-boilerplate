//FB CHATBOT BOILERPLATE -JMFernandez 2017
//Github Repository: 

'use strict';

//Import Dependecies
const express = require('express'),
	  router = express.Router(),
	  message = require('../model/message.js'),
	  parameters = require( './../../config/parameters.js'),
	  sendAPI = require('../service/sendAPI.js'),
	  response = require('../model/response.js'),
	  fbUser = require('../model/user.js'),
	  fbmessage = require('../model/message.js'),
	  bodyParser = require('body-parser');


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
			let fbId = webhook_event.sender.id;
			let msg = {};
			let msgPromise = {}

			getUser(fbId, (user) => {

				msg = new message({
					sender: user,
					entry: entry.id,
					message: webhook_event.message.text,
					attachement: webhook_event.message.attachement
				});

				msgPromise = msg.save();

				msgPromise.then(function(){
					if(webhook_event.message)
					{
						response.getMessageResponse(webhook_event.message.message, function(messageData){

							messageData.recipient = { id: user.fbId};

							sendAPI.seen(user.fbId);
							sendAPI.typeOn(user.fbId);
							sendAPI.sendMessage(messageData, function(){
								console.log("success");
								sendAPI.typeOff(user.fbId);
							});
						})
					}
					else if (webhook_event.postback) 
					{
						if(webhook_event.postback.payload === "GET_STARTED_PAYLOAD")
						{
							sendAPI.getStarted(user.fbId, function(){
								console.log("success");
								sendAPI.typeOff(fbId);
							});
						}

						response.getPostbackResponse(webhook_event.postback.payload, function(messageData){

							messageData.forEach(msgData => {

								msgData.recipient = { id: user.fbId };
								msgData.message.text = interpolateString(msgData.message.text, user);
								sendAPI.sendMessage(msgData, function(){
									console.log("success");
									sendAPI.typeOff(fbId);
								});
								
							});
							

						});
					}
				});

				

			})
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

const getUser = (fbId, cb) =>
{
	fbUser.findOne({fbId:fbId}, (err, user) =>
		{
			if(err)
				return;

			if(user !== null)
			{
				cb(user);
			}
			else
			{
				fbUser.createFromFb(fbId, function(parseBody){
					sendAPI.seen(fbId);
					sendAPI.typeOn(fbId);

					const newUser = new fbUser({
						fbId : parseBody.id,
						firstName : parseBody.first_name,
						lastName : parseBody.last_name,
						gender : parseBody.gender,
						profilePic : parseBody.profile_pic,
						locale : parseBody.locale,
						timezone : parseBody.timezone
					});

					let promise = newUser.save();

					promise.then(function(){
						console.log("sending getting started");
						cb(newUser);
					});
				});
			}
		});
};

const interpolateString = (messageText, user) => {

	let formattedText = messageText.replace(new RegExp('{{firstName}}','g'), user.firstName);
		formattedText = messageText.replace(new RegExp('{{lastName}}','g'), user.lastName);

		return formattedText;
}




module.exports = router;