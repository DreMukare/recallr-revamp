const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'All users must have names'],
		},
		email: {
			type: String,
			required: [true, 'All users must have a unique email'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('UserModel', userSchema);
