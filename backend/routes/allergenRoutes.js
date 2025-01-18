const express = require('express');
const router = express.Router();
const { setAllergen, getAllergens, updateAllergen, deleteAllergen } = require('../controllers/allergenController');

router.post('/', setAllergen);
router.get('/', getAllergens);
router.put('/:id', updateAllergen);
router.delete('/:id', deleteAllergen);

module.exports = router;
