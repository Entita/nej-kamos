const mongoose = require('mongoose');

module.exports = mongoose.model(
  'baskets',
  new mongoose.Schema(
    {
      products: {
        type: [
          {
            _id: false,
            productId: {
              type: String,
              required: true,
            },
            quantity: {
              type: Number,
              required: true,
            },
          },
        ],
        default: [],
      },
      couponId: {
        type: String || null,
        default: null,
      }
    },
    { timestamps: true },
  ),
);
