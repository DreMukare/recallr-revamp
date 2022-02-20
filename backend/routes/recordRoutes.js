const express = require('express');
const router = express.Router();
const {
	getRecords,
	setRecord,
	updateRecord,
	deleteRecord,
} = require('../controllers/recordController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getRecords).post(protect, setRecord);

router.route('/:id').delete(protect, deleteRecord).put(protect, updateRecord);

module.exports = router;
