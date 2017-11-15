'use strict';

const mongoose = require('mongoose'),
	  message = require('./message.js'),
	  schema = mongoose.Schema;
	  // messageModel = mongoose.model('Message');

const userSchema = new schema({
	fbId: {type: schema.Types.ObjectId, required: true, unique: true},
	firstName: String,
	lastName: String,
	profilePic: String,
	locale: String,
	timeZone: Number,
	gender: String,
	message: {type: schema.Types.ObjectId, ref:'Message'}
});


module.exports = userSchema;