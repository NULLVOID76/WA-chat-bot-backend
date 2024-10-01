import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes.js';
import { verifyWebhook, handleIncomingMessages } from './controllers/messageController.js';
import { DB_NAME } from './constant.js';


dotenv.config();  // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(bodyParser.json());

// API routes for fetching chat data
app.get('/api', chatRoutes);

// Webhook verification
app.get('/webhook', verifyWebhook);

// Handle incoming messages
app.post('/webhook', handleIncomingMessages);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
