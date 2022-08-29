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
    active: {
      type: Boolean,
      default: true,
    },
    couponId: {
      type: String || null,
      default: null,
    },
  },
  { timestamps: true },
);

const declareModel = () => {
  try {
    const model = mongoose.model('baskets');
    // model already declared
    return model;
  } catch {
    // declare model
    return mongoose.model('baskets', basketSchema);
  }
};

module.exports = declareModel();
