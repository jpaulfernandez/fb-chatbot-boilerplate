'use strict';

const rp = require('request-promise'),
	  parameters = require('./../../config/parameters.js');


const _sendAPI = {

	sendMessage: (messageData, cb) =>
	{
		messageData.access_token = parameters.pageAccessToken;

		const data = JSON.stringify(messageData);

		let options = 
		{
			method: 'POST',
			uri: parameters.uri + '/' + parameters.fbApiVersion + '/me/messages',
			qs: {
				access_token : parameters.pageAccessToken
			},
			body: data,
			headers: {
		        'Content-Type': 'application/json; charset=utf-8',
		        'Content-Length': Buffer.byteLength(data)
	      	}
		};

		rp(options).then(function(parseBody){
			cb(parseBody);
		},function(err){
			console.log(err);
		});
	},

	typeOn: (fbId) => 
	{
		let messageData = 
		{
			recipient: {
				id: fbId
			},
			sender_action: "typing_on"
		};

		_sendAPI.sendMessage(messageData, function(){
			return;
		});
	},

	typeOff: (fbId) => 
	{
		let messageData = 
		{
			recipient: {
				id: fbId
			},
			sender_action: "typing_off"
		};
		
		_sendAPI.sendMessage(messageData, function(){
			return;
		});
	},

	seen: (fbId) =>
	{
		let messageData = 
		{
			recipient: {
				id: fbId
			},
			sender_action: "typing_on"
		};
		
		_sendAPI.sendMessage(messageData, function(){
			return;
		});
	},

	getStarted: (fbId, cb) =>
	{
		console.log(fbId);

		let messageData = 
		{
			recipient: {
				id: fbId
			},
			message: {
				text: "fuck you!"
			}
		};

		console.log("sending Message to fb");
		
		_sendAPI.sendMessage(messageData, function(parseBody){
			console.log(parseBody);
			cb();
		});
	},

	getUserFromFb: (id, cb) =>
	{
		
	}
}


module.exports = _sendAPI;