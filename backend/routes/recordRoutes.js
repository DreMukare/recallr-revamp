const express = require('express');
const router = express.Router();
const {
	getRecords,
	setRecord,
	updateRecord,
	deleteRecord,
} = require('../controllers/recordController');

router.route('/').get(getRecords).post(setRecord);

router.route('/:id').delete(deleteRecord).put(updateRecord);

module.exports = router;
