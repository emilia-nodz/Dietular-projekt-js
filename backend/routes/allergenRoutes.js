const express = require('express');
const router = express.Router();
const { setAllergen, getAllergens } = require('../controllers/allergenController');

router.post('/', setAllergen);
router.get('/', getAllergens);

module.exports = router;
