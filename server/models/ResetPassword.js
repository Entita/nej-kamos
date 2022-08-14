const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resetPasswordSchema = new Schema(
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
);

const ResetPassword = mongoose.model('resetpasswords', resetPasswordSchema);
module.exports = ResetPassword;
