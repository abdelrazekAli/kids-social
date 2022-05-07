const router = require("express").Router();
const auth = require("./guards/auth.guard");
const Message = require("../models/Message");

const {
  msgValidation,
  checkUserId,
  checkConvId,
} = require("../utils/validation");

//add
router.post("/", auth, async (req, res) => {
  let validationResult = msgValidation(req.body);
  if (validationResult)
    return res.status(400).send(validationResult.details[0].message);

  try {
    // Check conversation id
    const result1 = await checkConvId(req.body.conversationId);
    if (typeof result1 === "string") return res.status(400).send(result1);

    // Check user id
    const result2 = await checkUserId(req.body.sender);
    if (typeof result2 === "string") return res.status(400).send(result2);

    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conversation messages
router.get("/:conversationId", auth, async (req, res) => {
  const { conversationId } = req.params;

  // Check conversation id
  const result = await checkConvId(conversationId);
  if (typeof result === "string") return res.status(400).send(result);

  try {
    const messages = await Message.find({
      conversationId: conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
