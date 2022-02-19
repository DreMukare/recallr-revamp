const asyncHandler = require('express-async-handler');
// @desc Gets user data
// @route GET /api/users
// @access Private
const getUsers = asyncHandler(async (req, res) => {
	res.status(200).json({ message: 'Get user data' });
});

// @desc Creates new user
// @route POST /api/users
// @access Private
const setUser = asyncHandler(async (req, res) => {
	if (!req.body.user) {
		res.status(400);
		throw new Error('User needs to have data');
	}

	res.status(200).json({ message: 'Create new user' });
});

// @desc Updates user data
// @route PUT /api/users/:id
// @access Private
const updateUser = asyncHandler(async (req, res) => {
	if (!req.body.user) {
		res.status(400);
		throw new Error('Please add the fields to be updated');
	}

	res.status(200).json({ message: `Updated user ${req.params.id}` });
});

// @desc Deletes user
// @route DELETE /api/users/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Delete user ${req.params.id}` });
});

module.exports = {
	getUsers,
	setUser,
	updateUser,
	deleteUser,
};
