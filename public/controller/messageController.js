'use strict';

const express = require('express'),
	  router  = express.Router(),
	  message = require('../model/message.js');


router.get('/', (req, res) =>
{
	res.send('Hello World');
});

module.exports = router;