const Joi = require("joi");

const update = Joi.object({
  phone: Joi.string().optional().trim(),
  fullName: Joi.string().optional().trim(),
  avatar: Joi.string().optional().trim(),
});

const userValidation = {
  update,
};

module.exports = userValidation;
