const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const declareModel = () => {
  try {
    const model = mongoose.model('subcategories');
    // model already declared
    return model;
  } catch {
    // declare model
    return mongoose.model('subcategories', subCategorySchema);
  }
};

module.exports = declareModel();
