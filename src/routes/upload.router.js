const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const uuid = require("uuid");
const uploadController = require("../controllers/upload.controller");
const { ValidationError } = require("../utils/error.utils");

const uploadPath = path.join(__dirname, "../../uploads");
const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    let extension = path.extname(file.originalname);
    let fileName = `${uuid.v4()}-${Date.now()}${extension}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  let type = file.mimetype;

  if (allowedTypes.includes(type)) return cb(null, true);
  else cb(new ValidationError("Image type is wrong"));
};

const uploadRouter = Router();

uploadRouter.post(
  "/image",
  multer({ storage, fileFilter }).single("image"),
  uploadController.uploadImage
);

module.exports = uploadRouter;
