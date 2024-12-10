const { Schema, model } = require("mongoose");

const ProductSpecSchema = new Schema({
  key: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  values: [
    {
      key: {
        type: String,
        required: true,
        trim: true,
      },
      value: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
});

const ProductVariantSchema = new Schema({
  specs: {
    type: Map,
    of: String,
    default: {},
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  images: {
    type: [Schema.Types.ObjectId],
    ref: "Image",
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
  slug: {
    type: String,
    trim: true,
    required: true,
  },
});

const ProductSchema = new Schema(
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

    categories: {
      type: [Schema.Types.ObjectId],
      ref: "Category",
      default: [],
    },
    specs: [ProductSpecSchema],
    variants: [ProductVariantSchema],
  },
  { timestamps: true }
);

const Product = model("Product", ProductSchema);

module.exports = Product;
