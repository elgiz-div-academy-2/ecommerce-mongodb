const { Router } = require("express");
const validationMiddleware = require("../middlewares/validation.middleware");
const userValidation = require("../validations/user.validation");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const userRouter = Router();

userRouter.get("/profile", userController.myProfile);
userRouter.post(
  "/profile",
  validationMiddleware(userValidation.update),
  userController.updateProfile
);

module.exports = userRouter;
