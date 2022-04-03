const Joi = require("joi");
const path = require("path");
const User = require("../models/User");
const Post = require("../models/Post");
const Conversation = require("../models/Conversation");
const Comment = require("../models/Comment");
const { ObjectId } = require("mongoose").Types;

exports.userValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(20),
    email: Joi.string().email(),
    password: Joi.string().min(3).max(255),
    userId: Joi.string(),
  });
  return schema.validate(data).error;
};

exports.postValidation = (data) => {
  const schema = Joi.object({
    desc: Joi.string().allow(null, ""),
    userId: Joi.string(),
    img: Joi.string(),
  });
  return schema.validate(data).error;
};

exports.commentValidation = (data) => {
  const schema = Joi.object({
    desc: Joi.string().max(1000).required(),
    postId: Joi.string().required(),
    userId: Joi.string(),
  });
  return schema.validate(data).error;
};

exports.msgValidation = (data) => {
  const schema = Joi.object({
    conversationId: Joi.string().required(),
    sender: Joi.string().required(),
    text: Joi.string().max(10000).required(),
  });
  return schema.validate(data).error;
};

exports.checkImgFromat = (image) => {
  let imageName = image.originalname;
  let imgExtension = path.extname(imageName);
  const allowedExtension = [".png", ".jpg", ".JPG", ".jpeg", ".svg", ".webp"];
  if (allowedExtension.includes(imgExtension) && imageName.length < 100)
    return true;
  return false;
};

// Check user Id
exports.checkUserId = async (id) => {
  if (!id) return "User id is required";
  else {
    if (ObjectId.isValid(id)) {
      let user = await User.findById(id)
        .populate({
          path: "family",
          select: "img username",
        })
        .populate({
          path: "friendRequests",
          select: "img username",
        })
        .populate({
          path: "sentRequests",
          select: "img username",
        });
      return user === null ? `There is no user with this id: ${id}` : user;
    } else return `user id: ${id} is not valid`;
  }
};

// Check post Id
exports.checkPostId = async (id) => {
  if (!id) return "Post id is required";
  else {
    if (ObjectId.isValid(id)) {
      let post = await Post.findById(id)
        .populate({
          path: "likes",
          select: "img username",
        })
        .populate({
          path: "userId",
          select: "img username",
        });
      return post === null ? `There is no post with this id: ${id}` : post;
    } else return `Post id: ${id} is not valid`;
  }
};

// Check comment Id
exports.checkCommentId = async (id) => {
  if (!id) return "Comment id is required";
  else {
    if (ObjectId.isValid(id)) {
      let comment = await Comment.findById(id).populate({
        path: "userId",
        select: "img username",
      });
      return comment === null
        ? `There is no comment with this id: ${id}`
        : comment;
    } else return `Comment id: ${id} is not valid`;
  }
};

// Check conversation Id
exports.checkConvId = async (id) => {
  if (!id) return "Conversation id is required";
  else {
    if (ObjectId.isValid(id)) {
      let conv = await Conversation.findById(id);
      return conv === null
        ? `There is no conversation with this id: ${id}`
        : conv;
    } else return `conversation id: ${id} is not valid`;
  }
};
