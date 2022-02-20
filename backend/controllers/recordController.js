const asyncHandler = require('express-async-handler');

const Records = require('../models/recordModel');

// @desc Gets record data
// @route GET /api/records
// @access Private
const getRecords = asyncHandler(async (req, res) => {
	const records = await Records.find({ user: req.user.id });

	res.status(200).json(records);
});

// @desc Creates new record entry
// @route POST /api/records
// @access Private
const setRecord = asyncHandler(async (req, res) => {
	if (!req.body) {
		res.status(400);
		throw new Error('record entry needs to have data');
	}

	const { procedure, date, prescribed } = req.body;

	const record = await Records.create({
		user: req.user.id,
		procedure,
		date,
		prescribed,
	});

	res.status(200).json(record);
});

// @desc Updates record data
// @route PUT /api/records/:id
// @access Private
const updateRecord = asyncHandler(async (req, res) => {
	const record = await Records.findById(req.params.id);

	if (!req.body) {
		res.status(400);
		throw new Error('Please add the fields to be updated');
	}

	if (!record) {
		res.status(400);
		throw new Error('Record not found');
	}

	// Check for user
	if (!req.user) {
		res.status(401);
		throw new Error('User not found');
	}

	// Making sure user logged in is owner of record
	if (record.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	const updatedRecord = await Records.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
		}
	);

	res.status(200).json(updatedRecord);
});

// @desc Deletes record
// @route DELETE /api/records/:id
// @access Private
const deleteRecord = asyncHandler(async (req, res) => {
	const record = await Records.findById(req.params.id);

	if (!record) {
		res.status(400);
		throw new Error('Record not found');
	}

	// Check for user
	if (!req.user) {
		res.status(401);
		throw new Error('User not found');
	}

	// Making sure user logged in is owner of record
	if (record.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	await record.remove();

	res.status(200).json({ message: `Delete record ${req.params.id}` });
});

module.exports = {
	getRecords,
	setRecord,
	updateRecord,
	deleteRecord,
};
