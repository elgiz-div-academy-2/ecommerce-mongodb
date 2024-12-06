const userService = require("../services/user.service");

const myProfile = async (req, res) => {
  let result = await userService.userProfile(req.user._id);
  res.json(result);
};
const updateProfile = async (req, res, next) => {
  try {
    let result = await userService.updateProfile(req.user._id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const userController = {
  myProfile,
  updateProfile,
};

module.exports = userController;
