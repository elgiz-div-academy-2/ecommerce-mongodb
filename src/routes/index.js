const { Router } = require("express");
const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const categoryRouter = require("./category.router");
const uploadRouter = require("./upload.router");
const authMiddleware = require("../middlewares/auth.middleware");
const productRouter = require("./product.router");

const router = Router();

router.use("/auth", authRouter);
router.use("/user", authMiddleware, userRouter);
router.use("/category", categoryRouter);
router.use("/upload", uploadRouter);
router.use("/product", productRouter);

module.exports = router;
