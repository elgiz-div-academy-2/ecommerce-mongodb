const { ValidationError } = require("../utils/error.utils");

const validationMiddleware = (schema) => {
  return (req, res, next) => {
    let validation = schema?.validate(req.body);
    if (validation.error)
      return next(new ValidationError(validation.error?.details?.[0]?.message));

    next();
  };
};

module.exports = validationMiddleware;
