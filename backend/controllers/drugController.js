const asyncHandler = require('express-async-handler');

const Drug = require('../models/drugModel');

// @desc Gets drug data
// @route GET /api/drugs
// @access Private
const getDrugs = asyncHandler(async (req, res) => {
	const drugs = await Drug.find({ uers: req.user.id });

	res.status(200).json(drugs);
});

// @desc Creates new drug entry
// @route POST /api/drugs
// @access Private
const setDrug = asyncHandler(async (req, res) => {
	if (!req.body) {
		res.status(400);
		throw new Error('Drug entry needs to have data');
	}

	const { name, dosage, instruction, duration } = req.body;

	const drug = await Drug.create({
		user: req.user.id,
		name,
		dosage,
		instruction,
		duration,
	});

	res.status(200).json(drug);
});

// @desc Updates drug data
// @route PUT /api/drugs/:id
// @access Private
const updateDrug = asyncHandler(async (req, res) => {
	const drug = await Drug.findById(req.params.id);

	if (!req.body) {
		res.status(400);
		throw new Error('Please add the fields to be updated');
	}

	if (!drug) {
		res.status(400);
		throw new Error('Drug entry not found');
	}

	// Check for user
	if (!req.user) {
		res.status(401);
		throw new Error('User not found');
	}

	// Making user logged in user is owner of bio
	if (drug.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	const updatedDrugEntry = await Drug.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
		}
	);

	res.status(200).json(updatedDrugEntry);
});

// @desc Deletes drug
// @route DELETE /api/drugs/:id
// @access Private
const deleteDrug = asyncHandler(async (req, res) => {
	const drug = await Drug.findById(req.params.id);

	if (!drug) {
		res.status(400);
		throw new Error('Drug entry not found');
	}

	// Check for user
	if (!req.user) {
		res.status(401);
		throw new Error('User not found');
	}

	// Making user logged in user is owner of bio
	if (drug.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	await drug.remove();

	res.status(200).json({ message: `Deleted drug ${req.params.id}` });
});

module.exports = {
	getDrugs,
	setDrug,
	updateDrug,
	deleteDrug,
};
