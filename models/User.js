const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    img: {
      type: String,
      default: "",
    },
    friends: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    friendRequests: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    sentRequests: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
