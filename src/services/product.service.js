const Product = require("../models/Product.model");
const { NotFoundError } = require("../utils/error.utils");
const generateSlug = require("../utils/slug.util");

const list = async (filter = {}) => {
  let query = Product.find();

  let where = {};

  if (filter.categories) {
    where.categories = {
      $in: filter.categories,
    };
  }

  if (filter.minPrice) {
    where["variants.price"] = {
      $gte: filter.minPrice,
    };
  }
  if (filter.maxPrice) {
    if (!where["variants.price"])
      where["variants.price"] = {
        $lte: filter.maxPrice,
      };
    else where["variants.price"].$lte = filter.maxPrice;
  }

  if (filter.color) {
    where["variants.specs.color"] = filter.color;
  }

  query.where(where);
  query.limit(filter.limit || 10);
  query.skip(filter.limit * (filter.page - 1));

  query.populate("categories");
  query.populate("variants.images");
  let products = await query;

  const total = await Product.countDocuments(where);
  return {
    products,
    total,
  };
};

const create = async (params) => {
  if (!params.slug) {
    params.slug = generateSlug(params.title);
  }
  let product = new Product(params);
  await product.save();

  return product;
};

const upsertVariant = async (id, params) => {
  const product = await Product.findById(id);

  if (!product) throw new NotFoundError("Product is not found");

  product.variants = product.variants || [];
  const { variants } = product;

  const variant = variants.find((variant) => {
    let checkSpec = Object.entries(variant.specs).some(([key, value]) => {
      return params.specs[key] !== value;
    });

    return checkSpec === false;
  });

  params.slug =
    params.slug ||
    variant?.slug ||
    generateSlug(`${Object.values(params.specs).join("-")}`);

  if (variant) {
    for (let [key, value] of params) {
      variant[key] = value;
    }
  } else {
    product.variants.push(params);
  }

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
  upsertVariant,
  deleteProduct,
};

module.exports = productService;
