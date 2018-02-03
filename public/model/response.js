'use strict';

const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

const responseSchema = new Schema({
	responseId : String,
	messageData : Schema.Types.Mixed,
	order: Number
});

responseSchema.statics.getPostbackResponse = (payload, cb) =>
{
	// mongoose.model('Response').find({responseId: payload}, function(err,response){

	// 	if(err) return;

	// 	if(response !== null)
	// 	{
	// 		let messageData = response.messageData;
	// 		cb(messageData);
	// 	}
	// });
	mongoose.model('Response')
			.find({responseId: payload})
       	    .sort({order:1})
			.exec(function(err,response){
				if(err) return;

				if(response !== null)
				{
					let messageData = response.messageData;
					cb(messageData);
				}
			});
}

responseSchema.statics.getMessageResponse = (payload, cb) =>
{
	let messageData = {
		message: {
			text: "Sorry, can't understand what you're saying"
		}
	};

	cb(messageData);
}


const response = mongoose.model('Response', responseSchema, 'response');

module.exports = response;