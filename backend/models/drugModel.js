const mongoose = require('mongoose');

const drugSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'usermodel',
		},
		name: String,
		dosage: String,
		instructions: String,
		duration: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('DrugModel', drugSchema);
