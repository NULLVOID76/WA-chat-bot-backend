import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes.js';
import { verifyWebhook, handleIncomingMessages } from './controllers/messageController.js';

dotenv.config();  // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API routes for fetching chat data
app.use('/api', chatRoutes);

// Webhook verification
app.get('/webhook', verifyWebhook);

// Handle incoming messages
app.post('/webhook', handleIncomingMessages);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
