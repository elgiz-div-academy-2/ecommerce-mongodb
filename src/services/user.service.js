const ImageModel = require("../models/Image.model");
const User = require("../models/User.model");
const { NotFoundError } = require("../utils/error.utils");

const userProfile = async (id) => {
  let user = await User.findById(id).populate("avatar").lean();
  if (!user) throw new NotFoundError("User is not found");

  return {
    ...user,
    password: undefined,
  };
};
const updateProfile = async (id, params) => {
  let user = await User.findById(id);

  if (!user) throw new NotFoundError("User is not found");

  if (params.avatar) {
    let image = await ImageModel.findById(params.avatar);
    if (!image) throw new NotFoundError("Image is not found");

    user.avatar = image._id;

    delete params.avatar;
  }

  for (let [key, value] of Object.entries(params)) {
    user[key] = value;
  }

  await user.save();

  return user;
};

const userService = {
  userProfile,
  updateProfile,
};

module.exports = userService;
