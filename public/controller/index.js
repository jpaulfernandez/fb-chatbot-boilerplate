'use strict';

const express = require('express'),
	  router = express.Router();

router.use('/', require('./botController'));
router.use('/message', require('./messageController'));


module.exports = router; 