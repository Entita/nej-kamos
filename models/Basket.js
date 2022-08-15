const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const basketSchema = new Schema(
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
    },
  },
  { timestamps: true },
);

const Basket = mongoose.model('baskets', basketSchema);
module.exports = Basket;
