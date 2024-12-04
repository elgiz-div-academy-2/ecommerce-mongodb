const { Router } = require("express");
const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const categoryRouter = require("./category.router");

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/category", categoryRouter);

module.exports = router;
