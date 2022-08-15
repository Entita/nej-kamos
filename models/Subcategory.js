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

const SubCategory = mongoose.model('subcategories', subCategorySchema);
module.exports = SubCategory;
