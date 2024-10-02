import axios from "axios";

const WHATSAPP_API_URL = `https://graph.facebook.com/v13.0/${process.env.PHONE_NUMBER_ID}/messages?access_token=${process.env.WHATSAPP_ACCESS_TOKEN}`;

// Send a simple text message
export const sendTextMessage = (to, text) => {
  console.log(WHATSAPP_API_URL);
  const data = {
    messaging_product: "whatsapp",
    to: to,
    type: "text",
    text: { body: text },
  };
  console.log(data);

  axios({
    method: "POST",
    url: WHATSAPP_API_URL,
    data: data,
  });
  // axios.post(WHATSAPP_API_URL, data)
  //   .then(response => console.log('Message sent:', response.data))
  //   .catch(error => console.error('Error sending message:', error.response ? error.response.data : error.message));
};

// Send interactive button message
export const sendGreetingMessage = (to, senderName,prev_msg_id) => {
  const data = {
    messaging_product: "whatsapp",
    to,
    context: {
      message_id: prev_msg_id,
    },
    type: "template",
    template: {
      name: "greeting",
      language: {
        code: "en_GB",
        policy: "deterministic",
      },
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: senderName,
            },
          ],
        },
      ],
    },
  };
  axios({
    method: "POST",
    url: WHATSAPP_API_URL,
    data: data,
  });
};
export const sendButtonMessage = (to, text, buttons) => {
  const data = {
    messaging_product: "whatsapp",
    to: to,
    type: "interactive",
    interactive: {
      type: "button",
      body: { text },
      action: {
        buttons: buttons.map((button) => ({
          type: "reply",
          reply: { id: button.id, title: button.title },
        })),
      },
    },
  };

  axios({
    method: "POST",
    url: WHATSAPP_API_URL,
    data: data,
  });
  // axios.post(WHATSAPP_API_URL, data)
  //   .then(response => console.log('Button message sent:', response.data))
  //   .catch(error => console.error('Error sending button message:', error.response ? error.response.data : error.message));
};
export const readMessage =(prev_msg_id)=>{
  axios({
    method: "POST",
    url: WHATSAPP_API_URL,
    data: {
      messaging_product: "whatsapp",
      status: "read",
      message_id: prev_msg_id,
    },
  });
}
