# WhatsApp Chatbot Backend

This repository contains the **backend** of the WhatsApp Chatbot application, built with **Node.js** and **Express**. It handles interactions with the **Meta WhatsApp API**, stores chat messages in **MongoDB**, and provides an API for the frontend to retrieve chat data.

## Table of Contents

- [About the Project](#about-the-project)
  - [Features](#features)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Session Management](#session-management)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About the Project

The **WhatsApp Chatbot Backend** provides the server-side functionality for the WhatsApp Chatbot application. It listens for incoming messages from WhatsApp, processes these messages, and sends appropriate responses. All conversations are stored in a MongoDB database for future reference. 

### Features

- **WhatsApp API Integration**: Interacts with the Meta WhatsApp API to send and receive messages.
- **MongoDB Storage**: Stores all chat messages in a MongoDB database for persistence.
- **REST API**: Exposes endpoints for fetching chat messages.
- **Webhook Handling**: Processes incoming webhook events from WhatsApp.
- **Session Management**: Tracks user sessions and manages timeouts for inactivity.

### Built With

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Axios](https://axios-http.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [CORS](https://www.npmjs.com/package/cors)

---

## Getting Started

To set up and run the backend project locally, follow these steps.

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v12 or later)
- **MongoDB** (local installation or access to a cloud database)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd whatsapp-chatbot-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set Up MongoDB**

   If you're using a local MongoDB instance, ensure it is running. You can also use **MongoDB Atlas** for a cloud-based solution.

4. **Create a `.env` file**

   In the `backend/` directory, create a `.env` file and add the following environment variables:

   ```plaintext
   MONGODB_URI=mongodb://localhost:27017/whatsapp_bot
   VERIFY_TOKEN=your_verify_token
   WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
   WHATSAPP_ACCESS_TOKEN=your_access_token
   PORT=5000
   ```

---

## Usage

### API Endpoints

The backend exposes the following API endpoints:

#### 1. GET `/api/chats`

Fetch all chat messages stored in the database.

- **Request**: No parameters required.
- **Response**:
  
```json
[
  {
    "_id": "614d1c8897b7a920fcd4d0e6",
    "from": "918765432100",
    "to": "WhatsAppBot",
    "message": "Hello",
    "timestamp": "2022-01-12T07:35:00Z"
  }
]
```

#### 2. POST `/webhook`

Handles incoming messages from the WhatsApp API.

- **Request**:
  
```json
{
  "from": "918765432100",
  "to": "WhatsAppBot",
  "text": {
    "body": "Hello"
  }
}
```

- **Response**: A status code `200 OK` is returned if the message is processed successfully.

---

## Project Structure

```plaintext
backend/
├── controllers/               # Contains logic for handling requests and responses
│   ├── messageController.js   # Handles incoming messages and verifies webhook
│   ├── sessionManager.js      # Manages session timeouts and updates
│   └── messageFormatter.js    # Formats messages (text/buttons) for WhatsApp
├── models/                    # Mongoose models for MongoDB
│   └── chatMessage.js         # Schema for storing chat messages
├── routes/                    # API routes
│   └── chatRoutes.js          # API route for fetching chat messages
├── .env                       # Environment variables for configuration
├── index.js                   # Main server setup and route handling
├── messageSender.js           # Handles sending messages via WhatsApp API
└── package.json               # Project dependencies
```

---

## Environment Variables

The application relies on several environment variables, which should be defined in a `.env` file:

- **`MONGODB_URI`**: The connection string for your MongoDB instance.
- **`VERIFY_TOKEN`**: The token used for webhook verification with WhatsApp.
- **`WHATSAPP_PHONE_NUMBER_ID`**: Your WhatsApp phone number ID.
- **`WHATSAPP_ACCESS_TOKEN`**: The access token for WhatsApp API.
- **`PORT`**: The port on which the server will run (default: 5000).

---

## Session Management

The backend manages user sessions to ensure a smooth interaction experience. Each session lasts for **2 hours** of inactivity, after which the session is reset. 

The session logic is handled in the **`sessionManager.js`** file, which tracks user interactions and checks for session expiration.

---

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. **Fork the repository**
2. **Create a new branch** for your feature or bug fix
3. **Commit your changes**
4. **Push your branch to your fork**
5. **Open a pull request** against the main repository

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

---

## Contact

**Your Name**  
- Email: [nullvoid76@example.com](mailto:nullvoid76@example.com)
- GitHub: [@nullvoid76](https://github.com/NULLVOID76)

*Feel free to reach out if you have any questions or suggestions!*

---
