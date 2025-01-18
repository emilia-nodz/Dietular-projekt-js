const asyncHandler = require('express-async-handler');
const Allergen = require('../models/allergen');

// post method
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

// get method
const getAllergens = asyncHandler(async (req, res) => {
  const allergens = await Allergen.find();
  res.status(200).json(allergens)
});

// update method
const updateAllergen = asyncHandler(async (req, res) => {
  console.log('Request body:', req.body); // Debugging line
  const allergen = await Allergen.findById(req.params.id);

  if (!allergen) {
    res.status(400);
    throw new Error('Allergen not found');
  }

  const updatedAllergen = await Allergen.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedAllergen);
});

// delete method
const deleteAllergen = asyncHandler(async (req, res) => {
  const allergen = await Allergen.findById(req.params.id);

  if (!allergen) {
    res.status(400);
    throw new Error('Allergen not found');
  }

  await allergen.deleteOne({_id: req.params.id});

  res.status(200).json({ id: req.params.id });
})


module.exports = { setAllergen, getAllergens, updateAllergen, deleteAllergen };