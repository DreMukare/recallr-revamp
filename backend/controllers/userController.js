const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bycrpt = require('bcryptjs');

const User = require('../models/usersModel');

// @desc Gets user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
	const { _id, name, email } = await User.findById(req.user.id);

	res.status(201).json({
		id: _id,
		name,
		email,
	});
});

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error('Please fill in all fields');
	}

	// Check if user already in db
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists.');
	}

	// Hashing the password
	const salt = await bycrpt.genSalt(10);
	const hashedPassword = await bycrpt.hash(password, salt);

	// Create user in db
	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// @desc Authenticate a user
// @route POST /api/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400);
		throw new Error('Email and password must be entered');
	}

	// Check for user email
	const user = await User.findOne({ email });

	// Checking for password
	if (user && (await bycrpt.compare(password, user.password))) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid credentials');
	}
});

// @desc Deletes user
// @route DELETE /api/users/:id
// @access Private
// const deleteUser = asyncHandler(async (req, res) => {
// 	res.status(200).json({ message: `Delete user ${req.params.id}` });
// });

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = {
	getMe,
	registerUser,
	loginUser,
};
