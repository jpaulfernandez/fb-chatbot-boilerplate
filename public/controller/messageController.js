'use strict';

const express = require('express'),
	  router  = express.Router(),
	  message = require('../model/message.js');


router.get('/', (req, res) =>
{
	const m = new message({
		sender: 'asd',
		entry: 'asd',
		message: 'asd',
		attachment: 'asd'
	});

	const saved = m.save();

	saved.then(function(){
		res.send('Hello WOrld');
	}, function(err){
		res.send(err);
	})
});

module.exports = router;