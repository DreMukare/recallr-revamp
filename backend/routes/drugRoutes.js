const express = require('express');
const router = express.Router();
const {
	getDrugs,
	setDrug,
	updateDrug,
	deleteDrug,
} = require('../controllers/drugController');

router.route('/').get(getDrugs).post(setDrug);

router.route('/:id').delete(deleteDrug).put(updateDrug);

module.exports = router;
