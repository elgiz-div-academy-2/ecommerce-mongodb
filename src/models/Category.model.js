const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    trim: true,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
});

const Category = model("Category", categorySchema);

module.exports = Category;
