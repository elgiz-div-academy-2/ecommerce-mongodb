const fs = require("fs/promises");
const ImageModel = require("../models/Image.model");

const uploadImage = async (file) => {
  let filename = file.filename;

  let image = new ImageModel({
    url: `/uploads/${filename}`,
  });

  await image.save();
  return image;
};

const uploadService = {
  uploadImage,
};

module.exports = uploadService;
