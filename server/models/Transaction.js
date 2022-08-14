const mongoose = require('mongoose');

module.exports = mongoose.model(
  'transactions',
  new mongoose.Schema(
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
  ),
);
