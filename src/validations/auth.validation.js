const Joi = require("joi");

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(30).required(),
});

const register = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(30).required(),
  fullName: Joi.string().trim().optional(),
  phone: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}(\s?\(?\d+\)?[\s\-\d]*)?$/)
    .message("Invalid phone number format."),
});

const authValidation = {
  login,
  register,
};

module.exports = authValidation;
