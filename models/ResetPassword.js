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

const declareModel = () => {
  try {
    const model = mongoose.model('resetpasswords');
    // model already declared
    return model;
  } catch {
    // declare model
    return mongoose.model('resetpasswords', resetPasswordSchema);
  }
};

module.exports = declareModel();
