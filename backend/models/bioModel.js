const mongoose = require('mongoose');

const bioSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'usermodel',
		},
		conditions: [String],
		allergies: [String],
		bloodGroup: String,
		dob: Date,
		drink: String,
		eyeColor: String,
		gender: String,
		height: String,
		insured: String,
		smoke: String,
		weight: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('BioModel', bioSchema);
