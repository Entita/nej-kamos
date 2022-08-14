const mongoose = require('mongoose');

module.exports = mongoose.model(
  'subcategories',
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      }
    },
    { timestamps: true },
  ),
);
