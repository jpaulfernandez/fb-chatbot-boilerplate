'use strict';

const response = require('')

const _getPostbackResponse = (payload, cb) => 
{
	const messageData = {};

	

	cb(messageData)
};

const _getMessageResponse = (payload ,cb) =>
{

};


module.exports = {
	getPostbackResponse : _getPostbackResponse,
	getMessageResponse : _getMessageResponse
};