const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const validationMiddleware = require("../middlewares/validation.middleware");
const orderValidation = require("../validations/order.validation");
const orderController = require("../controllers/order.controller");

const orderRouter = Router();

orderRouter.get("/", orderController.listByUser);
orderRouter.post(
  "/",
  validationMiddleware(orderValidation.create),
  orderController.create
);

module.exports = orderRouter;
