const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    desc: {
      type: String,
      max: 10000,
    },
    img: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
