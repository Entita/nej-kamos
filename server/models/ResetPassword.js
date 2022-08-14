const mongoose = require('mongoose');

module.exports = mongoose.model(
  'resetpasswords',
  new mongoose.Schema(
    {
      accountId: {
        type: String,
        required: true,
      },
      changed: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true },
  ),
);
