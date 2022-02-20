const asyncHandler = require('express-async-handler');

const Bio = require('../models/bioModel');

// @desc Gets bio data
// @route GET /api/bios
// @access Private
const getBios = asyncHandler(async (req, res) => {
	const bio = await Bio.find({ user: req.user.id });

	res.status(200).json(bio);
});

// @desc Creates new bio
// @route POST /api/bios
// @access Private
const setBio = asyncHandler(async (req, res) => {
	if (!req.body) {
		res.status(400);
		throw new Error('Bio needs to have data');
	}

	const {
		conditions,
		allergies,
		bloodGroup,
		dob,
		drink,
		eyeColor,
		gender,
		height,
		insured,
		smoke,
		weight,
	} = req.body;

	const bio = await Bio.create({
		user: req.user.id,
		conditions,
		allergies,
		bloodGroup,
		dob,
		drink,
		eyeColor,
		gender,
		height,
		insured,
		smoke,
		weight,
	});

	res.status(200).json(bio);
});

// @desc Updates bio data
// @route PUT /api/bios/:id
// @access Private
const updateBio = asyncHandler(async (req, res) => {
	const bio = await Bio.findById(req.params.id);

	if (!req.body) {
		res.status(400);
		throw new Error('Please add the fields to be updated');
	}

	if (!bio) {
		res.status(400);
		throw new Error('Bio not found');
	}

	// Check for user
	if (!req.user) {
		res.status(401);
		throw new Error('User not found');
	}

	// Make sure the logged in user matches the bio user
	if (bio.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	const updatedBio = await Bio.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.status(201).json(updatedBio);
});

// @desc Deletes bio
// @route DELETE /api/bios/:id
// @access Private
const deleteBio = asyncHandler(async (req, res) => {
	const bio = await Bio.findById(req.params.id);

	if (!bio) {
		res.status(400);
		throw new Error('Bio not found');
	}

	// Check for user
	if (!req.user) {
		res.status(401);
		throw new Error('User not found');
	}

	// Make sure the logged in user matches the bio user
	if (bio.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	await bio.remove();

	res.status(200).json({ message: `Deleted bio ${req.params.id}` });
});

module.exports = {
	getBios,
	setBio,
	updateBio,
	deleteBio,
};
