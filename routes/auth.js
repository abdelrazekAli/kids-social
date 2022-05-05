const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Token = require("../models/Token");
const router = require("express").Router();
const generateAccessToken = require("../utils/token");
const { userValidation } = require("../utils/validation");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //check user data
    let { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send("username, email, password are required");
    }

    let validationResult = userValidation(req.body);
    if (validationResult)
      return res.status(400).send(validationResult.details[0].message);

    let emailCheck = await User.findOne({ email: email });
    if (emailCheck) return res.status(409).send("email is already used");

    // generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    //save user
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    // Check email and password
    if (!email || !password)
      res.status(400).send("Email and password are required");

    let validationResult = userValidation(req.body);
    if (validationResult)
      return res.status(400).send(validationResult.details[0].message);
    // Check if email exist
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).send("Invalid email or password");

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password");

    // Create and assign a token
    let accessToken = generateAccessToken({ _id: user._id });
    let refreshToken = jwt.sign(
      { _id: user._id },
      process.env.JWT_TOKEN_SECRET
    );

    // Save refresh token to database
    let newToken = new Token({
      token: refreshToken,
    });
    await newToken.save();

    res.header("auth-token", accessToken).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      img: user.img,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//LOGOUT
router.post("/logout", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).send("token is required");

    // Check token in database
    let result = await Token.findOne({ token: token });
    if (!result) return res.status(403).send("Invalid token");

    // Delete token from database
    await Token.deleteOne({ token: token });

    res.status(204).send("Successfully logout");
  } catch (err) {
    res.status(500).send("Failed to logout");
    console.log(err);
  }
});

//RefreshToken
router.post("/refresh-token", async (req, res) => {
  const refreshToken = req.body.token;
  try {
    if (!refreshToken) return res.status(400).send("token is required");

    // Check token in database
    let result = await Token.findOne({ token: refreshToken });
    if (!result) return res.status(403).send("Invalid token");

    jwt.verify(refreshToken, process.env.JWT_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).send("Invalid token");

      // Generate new access token
      const accessToken = generateAccessToken({ _id: user._id });

      res.status(200).send({ accessToken: accessToken });
    });
  } catch (err) {
    res.status(500).send("Failed to refresh token");
    console.log(err);
  }
});

module.exports = router;
