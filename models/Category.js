const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const declareModel = () => {
  try {
    const model = mongoose.model('categories');
    // model already declared
    return model;
  } catch {
    // declare model
    return mongoose.model('categories', categorySchema);
  }
};

module.exports = declareModel();
