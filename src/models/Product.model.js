const { Schema, model } = require("mongoose");

const ProductModel = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [Schema.Types.ObjectId],
      ref: "Image",
      default: [],
    },
    categories: {
      type: [Schema.Types.ObjectId],
      ref: "Category",
      default: [],
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    discountType: {
      type: String,
      enum: ["percentage", "value"],
      default: "percentage",
    },
  },
  { timestamps: true }
);

const Product = model("Product", ProductModel);

module.exports = Product;
