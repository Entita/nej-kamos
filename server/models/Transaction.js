const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    basketId: {
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

const Transaction = mongoose.model('transactions', transactionSchema);
module.exports = Transaction;
