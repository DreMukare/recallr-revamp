const express = require('express');
const router = express.Router();
const {
	getBios,
	setBio,
	updateBio,
	deleteBio,
} = require('../controllers/bioController');

router.route('/').get(getBios).post(setBio);

router.route('/:id').delete(deleteBio).put(updateBio);

module.exports = router;
