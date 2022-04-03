const router = require("express").Router();
const auth = require("./guards/auth.guard");
const Comment = require("../models/Comment");
const {
  commentValidation,
  checkUserId,
  checkPostId,
  checkCommentId,
} = require("../utils/validation");

// Create a comment
router.post("/", auth, async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.body;
  try {
    // Validate comment
    let validationResult = commentValidation(req.body);
    if (validationResult)
      return res.status(400).send(validationResult.details[0].message);

    // Check user id
    let userResult = await checkUserId(userId);
    if (typeof userResult === "string") return res.status(400).send(userResult);

    // Check post id
    let postResult = await checkPostId(postId);
    if (typeof postResult === "string") return res.status(400).send(postResult);

    // Save comment
    const newComment = new Comment({ userId, ...req.body });
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get post comments
router.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  try {
    // Check post id
    let postResult = await checkPostId(postId);
    if (typeof postResult === "string") return res.status(400).send(postResult);

    let comments = await Comment.find({ postId: postId }).populate({
      path: "userId",
      select: "img username",
    });

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a comment
router.put("/:commentId", auth, async (req, res) => {
  let comment;
  const { commentId } = req.params,
    userId = req.user._id,
    { postId } = req.body;
  try {
    // Validate comment
    let validationResult = commentValidation(req.body);
    if (validationResult)
      return res.status(400).send(validationResult.details[0].message);

    // Check user id
    let userResult = await checkUserId(userId);
    if (typeof userResult === "string") return res.status(400).send(userResult);

    // Check post id
    let postResult = await checkPostId(postId);
    if (typeof postResult === "string") return res.status(400).send(postResult);

    // Check comment id
    let commentResult = await checkCommentId(commentId);
    typeof commentResult === "string"
      ? res.status(400).send(commentResult)
      : (comment = commentResult);

    if (comment.userId === userId) {
      await comment.updateOne({ $set: req.body });
      res.status(200).json("comment has been updated");
    } else {
      res.status(403).json("you can update only your comment");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a comment
router.delete("/:commentId", auth, async (req, res) => {
  let comment;
  const { commentId } = req.params,
    userId = req.user._id;

  try {
    // Check comment id
    let commentResult = await checkCommentId(commentId);
    typeof commentResult === "string"
      ? res.status(400).send(commentResult)
      : (comment = commentResult);
    console.log(comment.userId, userId);
    if (comment.userId._id == userId) {
      await Comment.findByIdAndDelete(commentId);
      res.status(200).json("comment has been deleted");
    } else {
      res.status(403).json("you can delete only your comment");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
