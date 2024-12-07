const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const productController = require("../controllers/product.controller");
const validationMiddleware = require("../middlewares/validation.middleware");
const productValidation = require("../validations/product.validation");
const productService = require("../services/product.service");
const productRouter = Router();

productRouter.get(
  "/",
  validationMiddleware(productValidation.list, "query"),
  productController.list
);
productRouter.get("/:id", () => {});
productRouter.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware(productValidation.create),
  productController.create
);
productRouter.post("/:id", authMiddleware, roleMiddleware("admin"), () => {});
productRouter.delete("/:id", authMiddleware, roleMiddleware("admin"), () => {});

module.exports = productRouter;
