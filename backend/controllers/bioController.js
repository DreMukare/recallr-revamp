const asyncHandler = require('express-async-handler');

const Bio = require('../models/bioModel');

// @desc Gets bio data
// @route GET /api/bios
// @access Private
const getBios = asyncHandler(async (req, res) => {
	const bio = await Bio.find();

	res.status(200).json(bio);
});

// @desc Creates new bio
// @route POST /api/bios
// @access Private
const setBio = asyncHandler(async (req, res) => {
	if (!req.body.bio) {
		res.status(400);
		throw new Error('Bio needs to have data');
	}

	res.status(200).json({ message: 'Create new bio' });
});

// @desc Updates bio data
// @route PUT /api/bios/:id
// @access Private
const updateBio = asyncHandler(async (req, res) => {
	if (!req.body.bio) {
		res.status(400);
		throw new Error('Please add the fields to be updated');
	}

	res.status(200).json({ message: `Updated bio ${req.params.id}` });
});

// @desc Deletes bio
// @route DELETE /api/bios/:id
// @access Private
const deleteBio = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Delete bio ${req.params.id}` });
});

module.exports = {
	getBios,
	setBio,
	updateBio,
	deleteBio,
};
