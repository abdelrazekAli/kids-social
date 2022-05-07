const router = require("express").Router();
const auth = require("./guards/auth.guard");
const Conversation = require("../models/Conversation");
const { checkUserId } = require("../utils/validation");

//new conv
router.post("/", auth, async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    // Check users id
    const result1 = await checkUserId(senderId);
    if (typeof result1 === "string") return res.status(400).send(result1);
    const result2 = await checkUserId(receiverId);
    if (typeof result2 === "string") return res.status(400).send(result2);

    // Check if there is an old conversation
    const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (conversation)
      return res
        .status(400)
        .send("There is already conversation with these ids");

    const newConversation = new Conversation({
      members: [senderId, receiverId],
    });
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv of a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    // Check user id
    const result1 = await checkUserId(userId);
    if (typeof result1 === "string") return res.status(400).send(result1);

    const conversation = await Conversation.find({
      members: { $in: [userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv of two users
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  const { firstUserId, secondUserId } = req.params;
  try {
    // Check users id
    const result1 = await checkUserId(firstUserId);
    if (typeof result1 === "string") return res.status(400).send(result1);
    const result2 = await checkUserId(secondUserId);
    if (typeof result2 === "string") return res.status(400).send(result2);
    const conversation = await Conversation.findOne({
      members: { $all: [firstUserId, secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
