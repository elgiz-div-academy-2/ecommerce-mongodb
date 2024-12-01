const User = require("../models/User.model");
const { AppError, NotFoundError } = require("../utils/error.utils");
const bcrypt = require("bcrypt");
const { encodePayload } = require("../utils/jwt.utils");

const logIn = async (params) => {
  const user = await User.findOne({ email: params.email }).lean();
  if (!user) throw new NotFoundError("Email or password is wrong");

  let checkPassword = bcrypt.compare(params.password, user.password);

  if (!checkPassword) throw new NotFoundError("Email or password is wrong");

  let token = encodePayload({ userId: user._id });

  return {
    token,
    user: {
      ...user,
      password: undefined,
    },
  };
};
const register = async (params) => {
  const checkUser = await User.findOne({ email: params.email });

  if (checkUser) {
    throw new AppError("Email is exists", 409);
  }

  let user = new User(params);

  await user.save();

  return user;
};

const authService = {
  logIn,
  register,
};

module.exports = authService;
