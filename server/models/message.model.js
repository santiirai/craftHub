import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  adminReply: { type: String },
  userMessage: { type: String, required: true },
  isReplied: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);
