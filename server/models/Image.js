const mongoose = require('mongoose');

module.exports = mongoose.model(
  'images',
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    { timestamps: true },
  ),
);
