const Category = require("../models/Category.model");
const { NotFoundError } = require("../utils/error.utils");

const create = async (params) => {
  let category = new Category(params);

  await category.save();

  return category;
};
const nestedList = async () => {
  let list = await Category.find().sort({ order: 1 }).lean();

  let result = list
    .filter((item) => !item.parentId)
    .map((item) => subCategories(list, item));

  return result;
};

const update = async (id, params) => {
  // 1st case
  // const category = await Category.findById(id);
  // if (!category) throw new NotFoundError("Category is not found");
  // await Category.updateOne({ _id: id }, params);
  // return category;

  // 2nd case
  let category = await Category.findByIdAndUpdate(id, params, { new: true });
  if (!category) throw new NotFoundError();
  return category;

  // 3rd case
  // let category = await Category.findById(id);
  // if(!category) throw new NotFoundError("Category is not found")
  // for(let [key,value] of Object.entries(params)){
  //   category[key] = value;
  // }
  // await category.save()
};

const deleteCategory = async (id) => {
  let list = await Category.find().lean();

  let category = await Category.findById(id).lean();
  category = subCategories(list, category);

  let simplifedList = simplifySubCategories(category);

  simplifedList.push({ ...category, children: undefined });

  let ids = simplifedList.map((item) => item._id);

  await Category.deleteMany({ _id: { $in: ids } });

  return simplifedList;
};

const simplifySubCategories = (category) => {
  let result = (category.children || []).reduce((prev, item) => {
    let children = simplifySubCategories(item);
    delete item.children;
    prev = [...prev, item, ...children];
    return prev;
  }, []);

  return result;
};

const subCategories = (list, category) => {
  const children = list
    .filter((item) => item.parentId?.toString() === category._id.toString())
    .map((item) => subCategories(list, item));
  return {
    ...category,
    children: children.length ? children : undefined,
  };
};

const categoryService = {
  create,
  update,
  nestedList,
  deleteCategory,
};

module.exports = categoryService;
