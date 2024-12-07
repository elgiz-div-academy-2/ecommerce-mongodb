const Product = require("../models/Product.model");
const { NotFoundError, ValidationError } = require("../utils/error.utils");
const generateSlug = require("../utils/slug.util");

const list = async (filter = {}) => {
  let query = Product.find();

  if (filter.categories) {
    query.in("categories", filter.categories);
  }
  if (filter.minPrice) {
    query.gte("price", filter.minPrice); // greater than or equal
  }
  if (filter.maxPrice) {
    query.lte("price", filter.maxPrice); // less than or equal
  }

  query.populate("categories");
  query.populate("images");
  let result = await query;
  return result;
};

const create = async (params) => {
  if (!params.slug) {
    params.slug = generateSlug(params.title);
  }
  let product = new Product(params);
  await product.save();

  return product;
};

const update = async (id, params) => {
  let product = await Product.findByIdAndUpdate(id, params, { new: true });
  if (!product) throw new NotFoundError("Product is not found");

  return product;
};

const deleteProduct = async (id) => {
  let result = await Product.deleteOne({ _id: id });
  return result.acknowledged;
};

const productService = {
  list,
  create,
  update,
  deleteProduct,
};

module.exports = productService;
