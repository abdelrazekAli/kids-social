const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  desc: {
    type: String,
    max: 1000,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
