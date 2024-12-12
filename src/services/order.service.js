const OrderGroup = require("../models/Order.model");
const { Product } = require("../models/Product.model");
const User = require("../models/User.model");
const { NotFoundError, AppError } = require("../utils/error.utils");

const listByUser = async (id) => {
  const list = await OrderGroup.find({ user: id })
    .sort({ createdAt: -1 })
    .populate("list.product");

  return list;
};

const create = async (user, params) => {
  let productIds = params.list.map((item) => item.productId);
  const products = await Product.find({ _id: { $in: productIds } });

  if (products.length !== productIds.length)
    throw new NotFoundError("Product is not found");

  let totalPrice = 0;
  let totalDiscount = 0;
  let orders = params.list.map((item) => {
    let product = products.find(
      (product) => product._id.toString() === item.productId
    );

    const variant = product.variants.find(
      (variant) => variant._id.toString() === item.variantId
    );

    if (!variant) throw new NotFoundError("Product variant is not found");

    if (variant.stock < item.count)
      throw new AppError(`"${variant.slug}" is out of stock`, 400);

    variant.stock -= item.count;

    let productPrice = variant.price * item.count;
    totalPrice += productPrice;

    // percentage
    totalDiscount += Math.floor((productPrice * variant.discount) / 100);

    // value

    return {
      product: product._id,
      price: variant.price,
      count: item.count,
      variant,
    };
  });

  await Promise.all(products.map((product) => product.save()));

  let payAmount = totalPrice - totalDiscount;

  if (user.balance < payAmount) {
    throw new AppError("Insufficent balance", 400);
  }

  let orderGroup = new OrderGroup({
    list: orders,
    totalPrice: totalPrice,
    totalDiscount: totalDiscount,
    user: user._id,
  });

  await orderGroup.save();

  await User.updateOne({ _id: user._id }, { $inc: { balance: -payAmount } });

  return orderGroup;
};

const orderService = {
  listByUser,
  create,
};

module.exports = orderService;
