const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    basketId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'waiting',
    },
  },
  { timestamps: true },
);

const declareModel = () => {
  try {
    const model = mongoose.model('transactions');
    // model already declared
    return model;
  } catch {
    // declare model
    return mongoose.model('transactions', transactionSchema);
  }
};

module.exports = declareModel();
