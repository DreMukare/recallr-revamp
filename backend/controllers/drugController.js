const asyncHandler = require('express-async-handler');

const Drug = require('../models/drugModel');

// @desc Gets drug data
// @route GET /api/drugs
// @access Private
const getDrugs = asyncHandler(async (req, res) => {
	const drugs = await Drug.find();

	res.status(200).json(drugs);
});

// @desc Creates new drug entry
// @route POST /api/drugs
// @access Private
const setDrug = asyncHandler(async (req, res) => {
	if (!req.body.drug) {
		res.status(400);
		throw new Error('Drug entry needs to have data');
	}

	res.status(200).json({ message: 'Create new drug entry' });
});

// @desc Updates drug data
// @route PUT /api/drugs/:id
// @access Private
const updateDrug = asyncHandler(async (req, res) => {
	if (!req.body.drug) {
		res.status(400);
		throw new Error('Please add the fields to be updated');
	}

	res.status(200).json({ message: `Updated drug ${req.params.id}` });
});

// @desc Deletes drug
// @route DELETE /api/drugs/:id
// @access Private
const deleteDrug = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Delete drug ${req.params.id}` });
});

module.exports = {
	getDrugs,
	setDrug,
	updateDrug,
	deleteDrug,
};
