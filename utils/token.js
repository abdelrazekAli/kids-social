const jwt = require("jsonwebtoken");

module.exports = (userData) => {
  return jwt.sign(userData, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "10m",
  });
};
