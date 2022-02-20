const asyncHandler = require('express-async-handler');

const Records = require('../models/recordModel');

// @desc Gets record data
// @route GET /api/records
// @access Private
const getRecords = asyncHandler(async (req, res) => {
	const records = await Record.find();

	res.status(200).json(records);
});

// @desc Creates new record entry
// @route POST /api/records
// @access Private
const setRecord = asyncHandler(async (req, res) => {
	if (!req.body.record) {
		res.status(400);
		throw new Error('record entry needs to have data');
	}

	res.status(200).json({ message: 'Create new record entry' });
});

// @desc Updates record data
// @route PUT /api/records/:id
// @access Private
const updateRecord = asyncHandler(async (req, res) => {
	if (!req.body.record) {
		res.status(400);
		throw new Error('Please add the fields to be updated');
	}

	res.status(200).json({ message: `Updated record ${req.params.id}` });
});

// @desc Deletes record
// @route DELETE /api/records/:id
// @access Private
const deleteRecord = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Delete record ${req.params.id}` });
});

module.exports = {
	getRecords,
	setRecord,
	updateRecord,
	deleteRecord,
};
