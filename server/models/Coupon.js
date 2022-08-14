const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hundredYears = 3110400000;

const couponSchema = new Schema(
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
);

const Coupon = mongoose.model('coupons', couponSchema);
module.exports = Coupon;
