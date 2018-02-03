const mongoose = require('mongoose'),
	  user = require('./user.js'),
	  Schema = mongoose.Schema;
	  //attachmentType = require(./attachmentType);
	  // userModel = mongoose.model('User');

const messageSchema = new Schema({
	sender: Schema.Types.Mixed,
	entry: String,
	message: String,
	attachment: String
});

const message = mongoose.model('Message', messageSchema);

module.exports = message;