//User Handler Service

'use strict';

const fbUser = require('../model/user.js'),
	  fbmessage = require('../model/message.js'),
	  rp = require('request-promise'),
	  parameters = require( './../../config/parameters.js');

const findOrCreateUser = (id, cb) =>
{
	const handleUser = (err, user) =>
	{
		if(err) throw err;
		
		if(Object.keys(user).length === 0)
		{
			let options = 
			{
				method: 'GET',
				uri: parameters.uri + '/' + parameters.fbApiVersion + '/' + id + '?access_token=' + parameters.pageAccessToken,
			};

			console.log("getting from facebook")

			rp(options).then((parseBody) => {

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

				promise.then((res) => {
					cb(newUser);
				}, function(err){
					console.log(err);
				})

			},(err) => {
				console.log(err);
			})
		}
		else
		{
			console.log("He's already here")
			cb(user);
		}
	}

	fbUser.findOne({fbId:id}, handleUser);
};

const createMessage = (message, user, cb) => {

	let newMessage = new fbMessage({
		sender: message.sender,
		entry: "asd"
	});


};

module.exports = { findOrCreateUser: findOrCreateUser};