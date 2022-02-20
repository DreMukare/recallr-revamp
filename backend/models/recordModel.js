const mongoose = require('mongoose');

const recordSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'UserModel',
		},
		procedure: String,
		date: Date,
		prescribed: [
			{
				name: String,
				dosage: String,
				instructions: String,
				duration: String,
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('RecordModel', recordSchema);
