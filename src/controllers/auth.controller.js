const authService = require("../services/auth.service");

const logIn = async (req, res, next) => {
  try {
    let result = await authService.logIn(req.body);
    return res.json(result);
  } catch (err) {
    next(err);
  }
};
const register = async (req, res, next) => {
  try {
    let result = await authService.register(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const authController = {
  logIn,
  register,
};

module.exports = authController;
