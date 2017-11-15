const mongoose = require('mongoose'),
	  user = require('./user.js'),
	  schema = mongoose.Schema;
	  // userModel = mongoose.model('User');

const messageSchema = new schema({
	sender: {type: schema.Types.ObjectId, ref:'User'},
	entry: String,
	message: String,
	attachment: String
});


module.exports = messageSchema;