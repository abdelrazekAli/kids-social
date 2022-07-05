const router = require("express").Router();
const auth = require("./guards/auth.guard");
const Message = require("../models/Message");
const {
  msgValidation,
  checkUserId,
  checkConvId,
} = require("../utils/validation");

// Add new message
router.post("/", auth, async (req, res) => {
  // Validate body
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

    // Save message to database
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();

    // Response
    res.status(200).json(savedMessage);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get conversation messages
router.get("/:conversationId", auth, async (req, res) => {
  const { conversationId } = req.params;

  // Check conversation id
  const result = await checkConvId(conversationId);
  if (typeof result === "string") return res.status(400).send(result);

  try {
    // Get messsage from database
    const messages = await Message.find({
      conversationId: conversationId,
    });

    // Response
    res.status(200).json(messages);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
