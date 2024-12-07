const uploadService = require("../services/upload.service");
const { AppError } = require("../utils/error.utils");

const uploadImage = async (req, res, next) => {
  if (!req.file) return next(new AppError("file is required", 400));

  let result = await uploadService.uploadImage(req.file);
  res.json(result);
};

const uploadController = {
  uploadImage,
};

module.exports = uploadController;
