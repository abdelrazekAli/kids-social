const multer = require("multer");
const router = require("express").Router();
const auth = require("./guards/auth.guard");

const userImgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/users");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const PostImgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/posts");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const userVoiceStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/voices");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const userImgUpload = multer({ storage: userImgStorage });
const postImgUpload = multer({ storage: PostImgStorage });
const userVoiceUpload = multer({ storage: userVoiceStorage });

// Upload user profile image
router.post("/images/users", auth, userImgUpload.single("file"), (req, res) => {
  try {
    return res.status(200).json("User Image uploaded successfully");
  } catch (error) {
    console.error(error);
  }
});

// Upload post image
router.post("/images/posts", auth, postImgUpload.single("file"), (req, res) => {
  try {
    return res.status(200).json("Post Image uploaded successfully");
  } catch (error) {
    console.error(error);
  }
});

// Upload user voice record
router.post("/voices", auth, userVoiceUpload.single("file"), (req, res) => {
  try {
    return res.status(200).json("User Image uploaded successfully");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
