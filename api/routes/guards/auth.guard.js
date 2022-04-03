const jwt = require("jsonwebtoken");

// Check token errors
const { TokenExpiredError } = jwt;
const catchExpireError = (err, res) => {
  if (err instanceof TokenExpiredError)
    return res.status(401).send("Access Token was expired!");
  res.status(403).send("Invalid token.");
};

module.exports = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied. No token provided");

  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decode) => {
    if (err) return catchExpireError(err, res);

    req.user = decode;

    next();
  });
};
