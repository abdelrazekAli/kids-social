const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const auth = require("./guards/auth.guard");
const {
  postValidation,
  checkUserId,
  checkPostId,
} = require("../utils/validation");

// Create a post
router.post("/", auth, async (req, res) => {
  const userId = req.user._id;

  try {
    // Validate post
    let validationResult = postValidation(req.body);
    if (validationResult)
      return res.status(400).send(validationResult.details[0].message);

    // Check user id
    let result = await checkUserId(userId);
    if (typeof result === "string") return res.status(400).send(result);

    // Save post
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();

    // Response
    res.status(200).json(savedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get a post
router.get("/:postId", async (req, res) => {
  let post;
  const { postId } = req.params;

  try {
    // Check post id
    let postResult = await checkPostId(postId);
    typeof postResult === "string"
      ? res.status(400).send(postResult)
      : (post = postResult);

    // Response
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get user's all posts
router.get("/user/:userId", async (req, res) => {
  let user;
  const { userId } = req.params;
  try {
    // Check user id
    let result = await checkUserId(userId);
    typeof result === "string" ? res.status(400).send(result) : (user = result);

    // Get posts
    const posts = await Post.find({ userId: user._id }).populate({
      path: "userId",
      select: "img username",
    });

    // Response
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get timeline posts
router.get("/timeline/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    // get user
    const user = await User.findById(userId);

    // get timeline posts
    const posts = await Post.find({
      userId: { $in: [user._id, ...user.friends] },
    })
      .populate({
        path: "likes",
        select: "img username",
      })
      .populate({
        path: "userId",
        select: "img username",
      })
      .sort({ createdAt: -1 });

    // Response
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a post
router.put("/:postId", auth, async (req, res) => {
  let post;
  const { postId } = req.params,
    userId = req.user._id;
  try {
    if (!userId) return res.status(400).send("UserId is required");

    // Check user id
    let userResult = await checkUserId(userId);
    if (typeof userResult === "string") return res.status(400).send(userResult);

    // Check post id
    let postResult = await checkPostId(postId);
    typeof postResult === "string"
      ? res.status(400).send(postResult)
      : (post = postResult);

    // Validate body
    let validationResult = postValidation(req.body);
    if (validationResult)
      return res.status(400).send(validationResult.details[0].message);

    // Check if user is the post owner
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });

      // Response
      res.status(200).json("post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post
router.delete("/:postId", auth, async (req, res) => {
  let post;
  const { postId } = req.params,
    userId = req.user._id;

  try {
    // Check post id
    let result = await checkPostId(postId);
    typeof result === "string" ? res.status(400).send(result) : (post = result);

    // Check if user is the post owner
    if (post.userId._id == userId) {
      // Delete post and its commemts
      await Promise.all([post.deleteOne(), Comment.deleteMany({ postId })]);

      // Response
      res.status(200).json("post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Like || dislike a post
router.put("/:postId/like", auth, async (req, res) => {
  const { postId } = req.params,
    userId = req.user._id;
  try {
    // Check user id
    let userResult = await checkUserId(userId);
    if (typeof userResult === "string") return res.status(400).send(userResult);

    // Get post
    const post = await Post.findById(postId);

    // Check if post already liked by this user or not
    if (!post.likes.includes(userId)) {
      // Like
      await post.updateOne({ $push: { likes: userId } });

      // Response
      res.status(200).json("Post has been liked");
    } else {
      // Dislike
      await post.updateOne({ $pull: { likes: userId } });

      // Response
      res.status(200).json("Post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
