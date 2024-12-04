const categoryService = require("../services/category.service");

const create = async (req, res, next) => {
  try {
    const { body } = req;
    let result = await categoryService.create(body);

    res.json(result);
  } catch (err) {
    next(err);
  }
};

const nestedList = async (req, res, next) => {
  try {
    let result = await categoryService.nestedList();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    let result = await categoryService.deleteCategory(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    let result = await categoryService.update(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const categoryController = {
  create,
  nestedList,
  deleteCategory,
  update,
};

module.exports = categoryController;
