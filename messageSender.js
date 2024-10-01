import axios from 'axios';

const WHATSAPP_API_URL = `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages?access_token=${process.env.WHATSAPP_ACCESS_TOKEN}`;

// Send a simple text message
export const sendTextMessage = (to, text) => {
  
  const data = {
    messaging_product: 'whatsapp',
    to: to,
    type: 'text',
    text: { body: text },
  };
  console.log(WHATSAPP_API_URL);
  console.log(data);
  
  
  axios.post(WHATSAPP_API_URL, data)
    .then(response => console.log('Message sent:', response.data))
    .catch(error => console.error('Error sending message:', error.response ? error.response.data : error.message));
};

// Send interactive button message
export const sendButtonMessage = (to, text, buttons) => {
  const data = {
    messaging_product: 'whatsapp',
    to: to,
    type: 'interactive',
    interactive: {
      type: 'button',
      body: { text },
      action: {
        buttons: buttons.map(button => ({
          type: 'reply',
          reply: { id: button.id, title: button.title }
        })),
      },
    },
  };

  axios.post(WHATSAPP_API_URL, data)
    .then(response => console.log('Button message sent:', response.data))
    .catch(error => console.error('Error sending button message:', error.response ? error.response.data : error.message));
};
