const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Token = require("../models/Token");
const router = require("express").Router();
const auth = require("./guards/auth.guard");
const generateAccessToken = require("../utils/token");
const Conversation = require("../models/Conversation");
const { userValidation, checkUserId } = require("../utils/validation");

//get user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    // Check user id
    let result = await checkUserId(userId);
    typeof result === "string"
      ? res.status(400).send(result)
      : ({ password, updatedAt, ...others } = result._doc);
    res.status(200).json(others);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Search user by username
router.get("/", async (req, res) => {
  const { search } = req.query;
  try {
    const users = await User.find({
      username: { $regex: search, $options: "i" },
    }).limit(5);
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//update user
router.put("/:id", auth, async (req, res) => {
  const userId = req.user._id;
  if (userId === req.params.id) {
    try {
      let validationResult = userValidation(req.body);
      if (validationResult)
        return res.status(400).send(validationResult.details[0].message);

      // Check email
      let user = await User.findById(userId);
      if (user.email !== req.body.email) {
        let emailCheck = await User.findOne({ email: req.body.email });
        if (emailCheck) return res.status(409).json("Email is already used");
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: req.body,
        },
        { new: true }
      );

      // Create and assign a token
      let accessToken = generateAccessToken({ _id: userId });
      let refreshToken = jwt.sign(
        { _id: userId },
        process.env.JWT_TOKEN_SECRET
      );

      // Save refresh token to database
      let newToken = new Token({
        token: refreshToken,
      });
      await newToken.save();

      const { password, friendRequests, sentRequests, __v, ...others } =
        updatedUser._doc;
      res.header("auth-token", accessToken).json({
        ...others,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

//Send friend request
router.put("/:id/add", auth, async (req, res) => {
  let user, friend;
  const userId = req.user._id,
    friendId = req.params.id;

  if (userId !== friendId) {
    try {
      // Check users Id
      let result1 = await checkUserId(userId);
      typeof result1 === "string"
        ? res.status(400).send(result1)
        : (user = result1);

      let result2 = await checkUserId(friendId);
      typeof result2 === "string"
        ? res.status(400).send(result2)
        : (friend = result2);

      if (friend.friends.find((u) => u._id == userId)) {
        return res.status(403).json("you already friend with this user");
      } else if (user.sentRequests.includes(friendId)) {
        return res
          .status(403)
          .json("you already sent friend request to this user");
      } else {
        await Promise.all([
          // Add friend id to user sentRequests
          user.updateOne({ $push: { sentRequests: friendId } }),
          // Add user id to friend friendRequests
          friend.updateOne({ $push: { friendRequests: userId } }),
        ]);
        res.status(200).json("request has been sent");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cannot add yourself");
  }
});

//Cancel friend request
router.delete("/:id/cancel", auth, async (req, res) => {
  let user, friend;
  const userId = req.user._id,
    friendId = req.params.id;

  if (userId !== friendId) {
    try {
      // Check users Id
      let result1 = await checkUserId(userId);
      typeof result1 === "string"
        ? res.status(400).send(result1)
        : (user = result1);
      let result2 = await checkUserId(friendId);
      typeof result2 === "string"
        ? res.status(400).send(result2)
        : (friend = result2);

      if (!friend.friends.find((u) => u._id == userId)) {
        await Promise.all([
          // Remove friend id from user sentRequests
          user.updateOne({ $pull: { sentRequests: friendId } }),
          // Remove user id from friend friendRequests
          friend.updateOne({ $pull: { friendRequests: userId } }),
        ]);
        res.status(200).json("request has been canceled");
      } else {
        res.status(403).json("you already friend with this user");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cannot cancel yourself");
  }
});

//Reject friend request
router.delete("/:id/reject", auth, async (req, res) => {
  let user, friend;
  const userId = req.user._id,
    friendId = req.params.id;

  if (userId !== friendId) {
    try {
      // Check users Id
      let result1 = await checkUserId(userId);
      typeof result1 === "string"
        ? res.status(400).send(result1)
        : (user = result1);
      let result2 = await checkUserId(friendId);
      typeof result2 === "string"
        ? res.status(400).send(result2)
        : (friend = result2);

      if (!friend.friends.find((u) => u._id == userId)) {
        await Promise.all([
          // Remove friend id from user friendRequests
          user.updateOne({ $pull: { friendRequests: friendId } }),
          // Remove user id from friend sentRequests
          friend.updateOne({ $pull: { sentRequests: userId } }),
        ]);
        res.status(200).json("request has been rejected");
      } else {
        res.status(403).json("you already friend with this user");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cannot reject yourself");
  }
});

//Accept friend request
router.put("/:id/accept", auth, async (req, res) => {
  let user, friend;
  const userId = req.user._id,
    friendId = req.params.id;

  if (userId !== friendId) {
    try {
      // Check users Id
      let result1 = await checkUserId(userId);
      typeof result1 === "string"
        ? res.status(400).send(result1)
        : (user = result1);

      let result2 = await checkUserId(friendId);
      typeof result2 === "string"
        ? res.status(400).send(result2)
        : (friend = result2);

      const newConversation = new Conversation({
        members: [userId, friendId],
      });

      if (!friend.friends.find((u) => u._id == userId)) {
        await Promise.all([
          // Remove friend id from user sentRequests
          friend.updateOne({ $pull: { sentRequests: userId } }),
          // Remove user id from friend friendRequests
          user.updateOne({ $pull: { friendRequests: friendId } }),
          // Add user id to friend friends
          friend.updateOne({ $push: { friends: userId } }),
          // Add friend id to user friends
          user.updateOne({ $push: { friends: friendId } }),
          // Make a new conversation for them
          newConversation.save(),
        ]);
        res.status(200).json("request has been accepted");
      } else {
        res.status(403).json("you already friend with this user");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cannot accept yourself");
  }
});

//Delete friend
router.put("/:id/delete", auth, async (req, res) => {
  let user, friend;
  const userId = req.user._id,
    friendId = req.params.id;

  if (userId !== friendId) {
    try {
      // Check users Id
      let result1 = await checkUserId(userId);
      typeof result1 === "string"
        ? res.status(400).send(result1)
        : (user = result1);
      let result2 = await checkUserId(friendId);
      typeof result2 === "string"
        ? res.status(400).send(result2)
        : (friend = result2);

      if (friend.friends.find((u) => u._id == userId)) {
        await Promise.all([
          // Remove friend id from user friends
          user.updateOne({ $pull: { friends: friendId } }),
          // Remove user id from friend friends
          friend.updateOne({ $pull: { friends: userId } }),
        ]);
        res.status(200).json("friend has been deleted");
      } else {
        res.status(403).json("you are not friend with this user");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cannot unfriend yourself");
  }
});

//Get user's all friends
router.get("/friends/:userId", async (req, res) => {
  let friends;
  const { userId } = req.params;
  try {
    // Check user id
    let result = await checkUserId(userId);
    typeof result === "string"
      ? res.status(400).send(result)
      : ({ friends } = result);

    res.status(200).json(friends);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get user's all friend requests
router.get("/friendRequests/:userId", async (req, res) => {
  let friendRequests;
  const { userId } = req.params;
  try {
    // Check user id
    let result = await checkUserId(userId);
    typeof result === "string"
      ? res.status(400).send(result)
      : ({ friendRequests } = result);

    res.status(200).json(friendRequests);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
