'use strict';

const mongoose = require('mongoose'),
	  message = require('./message.js'),
	  rp = require('request-promise'),
	  parameters = require('./../../config/parameters.js'),
	  Schema = mongoose.Schema;

const userSchema = new Schema({
	fbId: String,
	firstName: String,
	lastName: String,
	profilePic: String,
	locale: String,
	timeZone: Number,
	gender: String,
});

userSchema.statics.createFromFb = (fbId, cb) => 
{
	let options = 
		{
			method: 'GET',
			uri: parameters.uri + '/' + parameters.fbApiVersion + '/' + fbId + '?access_token=' + parameters.pageAccessToken,
		};

		console.log("getting from facebook")

		rp(options).then((parseBody) => {
			parseBody = JSON.parse(parseBody);
			cb(parseBody);

			return;
		},(err) => {
			console.log(err);
		})
};

const user = mongoose.model('User', userSchema);


module.exports = user;