const mongoose = require('mongoose');
const hundredYears = 3110400000;

module.exports = mongoose.model(
  'coupons',
  new mongoose.Schema(
    {
      code: {
        type: String,
        required: true,
        unique: true,
      },
      active: {
        type: Boolean,
        default: true,
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
    },
    { timestamps: true },
  ),
);
