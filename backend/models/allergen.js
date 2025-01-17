const mongoose = require('mongoose');
const allergen = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add an allergen name'],
    },
  }
);
module.exports = mongoose.model('Allergen', allergen);