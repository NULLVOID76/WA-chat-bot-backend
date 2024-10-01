import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema({
  from: { type: String, required: true },
  // to: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);

export default ChatMessage;
