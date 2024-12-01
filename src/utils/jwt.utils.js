const jwt = require("jsonwebtoken");
const config = require("../config");

const encodePayload = (payload) => {
  let token = jwt.sign(payload, config.jwtSecret, { expiresIn: "1d" });
  return token;
};

const decodeToken = (token) => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch {
    return false;
  }
};

module.exports = {
  encodePayload,
  decodeToken,
};
