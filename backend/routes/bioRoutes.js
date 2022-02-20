const express = require('express');
const router = express.Router();
const {
	getBios,
	setBio,
	updateBio,
	deleteBio,
} = require('../controllers/bioController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getBios).post(protect, setBio);

router.route('/:id').delete(protect, deleteBio).put(protect, updateBio);

module.exports = router;
