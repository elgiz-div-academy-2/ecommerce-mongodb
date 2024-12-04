const { Router } = require("express");
const categoryController = require("../controllers/category.controller");
const validationMiddleware = require("../middlewares/validation.middleware");
const categoryValidation = require("../validations/category.validation");

const categoryRouter = Router();

categoryRouter.get("/", categoryController.nestedList);
categoryRouter.post(
  "/",
  validationMiddleware(categoryValidation.create),
  categoryController.create
);
categoryRouter.post(
  "/:id",
  validationMiddleware(categoryValidation.update),
  categoryController.update
);

categoryRouter.delete("/:id", categoryController.deleteCategory);

module.exports = categoryRouter;
