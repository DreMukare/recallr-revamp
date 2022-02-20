const express = require('express');
const router = express.Router();
const {
	getDrugs,
	setDrug,
	updateDrug,
	deleteDrug,
} = require('../controllers/drugController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getDrugs).post(protect, setDrug);

router.route('/:id').delete(protect, deleteDrug).put(protect, updateDrug);

module.exports = router;
