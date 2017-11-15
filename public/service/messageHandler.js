//Message Handler Service

'use strict';

const parameters = require( './../../config/parameters.js');

//Handle message events
const _handleMessage = (sender_psid, received_message) =>
{
	let response;

	if(received_message.text)
	{
		//get response here based on the given input
		response = "Hello!";
	}
	else
	if (received_message.attachment) 
	{
		//get response here based on the attachment
	}
};

//Handle postback events received from a structured message
const _handlePostback = (sender_psid, received_postback) =>
{

};

//Private function to send response back to facebook
const _callSendApi = (sender_psid, response) =>
{

};

//send typing on action
const _typingOn = (send_psid) =>
{
	var messageData = 
	{
      recipient: {
        id: send_psid
      },
      sender_action: "typing_on"
    };

    _callSendApi(send_psid, messageData);

    return;
};

module.exports = 
{
	handleMessage : _handleMessage,
	handlePostback : _handlePostback
};