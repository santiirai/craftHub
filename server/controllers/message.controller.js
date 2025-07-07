import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const newMsg = new Message({ userId: req.user.id, content });
    await newMsg.save();
    res.status(201).json(newMsg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserMessages = async (req, res) => {
  try {
    const messages = await Message.find({ userId: req.user.id });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const replyMessage = async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: "Access denied" });

  try {
    const { messageId } = req.params;
    const { reply } = req.body;

    const message = await Message.findById(messageId);
    if (!message) return res.status(404).json({ message: "Message not found" });

    message.reply = reply;
    await message.save();
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
