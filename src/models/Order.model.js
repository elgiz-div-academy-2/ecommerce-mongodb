const { Schema, model } = require("mongoose");
const { ProductVariantSchema } = require("./Product.model");

const OrderSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  price: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  variant: ProductVariantSchema,
});

const OrderGropSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    list: [OrderSchema],
    totalPrice: {
      type: Number,
      required: true,
    },
    totalDiscount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const OrderGroup = model("OrderGroup", OrderGropSchema);

module.exports = OrderGroup;
