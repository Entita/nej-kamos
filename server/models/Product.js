const mongoose = require('mongoose');

module.exports = mongoose.model(
  'products',
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      discount: {
        type: {
          _id: false,
          percent: {
            type: Number,
            default: 0,
          },
          amount: {
            type: Number,
            default: 0,
          },
        },
      },
      imageUrl: {
        type: String,
        required: true,
      },
      brand: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      subcategory: {
        type: String,
        required: true,
      },
      stock: {
        type: Number,
        required: true,
      },
    },
    { timestamps: true },
  ),
);
