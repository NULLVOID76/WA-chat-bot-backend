import express from 'express';
import ChatMessage from '../models/chatMessage.js';

const router = express.Router();

// Get all chat messages from the database
router.get('/chats', async (req, res) => {
  try {
    const chats = await ChatMessage.find({});
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chat messages' });
  }
});

export default router;
