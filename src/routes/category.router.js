const { Router } = require("express");
const categoryController = require("../controllers/category.controller");
const validationMiddleware = require("../middlewares/validation.middleware");
const categoryValidation = require("../validations/category.validation");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const categoryRouter = Router();

categoryRouter.get("/", categoryController.nestedList);
categoryRouter.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware(categoryValidation.create),
  categoryController.create
);
categoryRouter.post(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware(categoryValidation.update),
  categoryController.update
);

categoryRouter.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  categoryController.deleteCategory
);

module.exports = categoryRouter;
