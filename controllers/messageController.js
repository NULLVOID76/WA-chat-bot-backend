import { sendTextMessage, sendButtonMessage } from '../messageSender.js';
import { updateSession, isSessionExpired, resetSession } from './sessionManager.js';
import { formatMainMenuButtons, formatUGAdmissionButtons } from './messageFormatter.js';
import ChatMessage from '../models/chatMessage.js';

// Handle incoming WhatsApp messages
export const handleIncomingMessages = async (req, res) => {
  // console.log(req.body.entry[0].changes[0].value.messages[0]);
  // console.log(req.body.entry[0].changes[0].value.contacts[0].profile);
  if(req.body.entry &&
    req.body.entry[0].changes &&
    req.body.entry[0].changes[0].value.messages &&
    req.body.entry[0].changes[0].value.messages[0])
 { const {from, text ,id} = req.body.entry[0].changes[0].value.messages[0];
  const {name}=req.body.entry[0].changes[0].value.contacts[0].profile;

  console.log("from :",from);
  console.log("name :",name);
  console.log("text :",text);
  console.log("id :",id);
  
  const messageBody = text.body.toLowerCase();  // User's message in lowercase

  // Check if session has expired
  if (isSessionExpired(from)) {
    resetSession(from);
    updateSession(from);
    
    // Send greeting with main menu
    sendButtonMessage(from, 'Greetings of the day! Please choose from one of the following:', formatMainMenuButtons());
  } else {
    updateSession(from);  // Update session timestamp

    // Handle user response
    switch (messageBody) {
      case 'about mmmut':
        sendTextMessage(from, 'Learn more about MMMUT here: [LINK]');
        break;

      case 'ug admission enquiry':
        sendButtonMessage(from, 'To help with admissions, please choose one of the following:', formatUGAdmissionButtons());
        break;

      case 'contact details':
        sendTextMessage(from, 'Contact Details:\nPhone: 8765783796\nAdmission Enquiry: 9235500507');
        break;

      case 'show all programs':
        sendTextMessage(from, 'Here is the link to view all programs: [LINK]');
        break;

      default:
        sendTextMessage(from, 'Sorry, I didn’t understand that. Please choose from the menu options.');
    }
  }

  // Store chat in the database
  try {
    const chatMessage = new ChatMessage({
      from,
      message: messageBody,
    });
    await chatMessage.save();
    res.sendStatus(200);
  } catch (err) {
    console.error('Error storing chat:', err);
    res.sendStatus(500);
  }}
};

// Webhook verification for WhatsApp API
export const verifyWebhook = (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
};
