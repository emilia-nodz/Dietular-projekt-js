const asyncHandler = require('express-async-handler');

const Allergen = require('../models/allergen');
const setAllergen = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error('Please add an allergen name');
  }
  const allergen = await Allergen.create({
    name: req.body.name,
  });
  res.status(200).json(allergen);
});


const getAllergens = asyncHandler(async (req, res) => {
  const allergens = await Allergen.find();
  res.status(200).json(allergens)
});

module.exports = { setAllergen, getAllergens };