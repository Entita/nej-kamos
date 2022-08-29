const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const declareModel = () => {
  try {
    const model = mongoose.model('images');
    // model already declared
    return model;
  } catch {
    // declare model
    return mongoose.model('images', imageSchema);
  }
};

module.exports = declareModel();
