# Event Management Platform - Backend

This repository contains the backend code for the Event Management Platform, an application designed for organizing and managing events. This platform supports features for both general users and administrators, including browsing events, booking tickets, and managing event details.

## Technology Stack

- **MongoDB**: NoSQL database used for storing all event and user data.
- **Express.js**: Web application framework that simplifies routing and interactions with the MongoDB database.
- **Node.js**: JavaScript runtime environment that executes JavaScript code server-side.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js for managing relationships between data, schema validation, etc.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (at least v12.0)
- MongoDB (local setup or MongoDB Atlas)
- npm (typically installed with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/SaintsRoots/elite-ltd-eventmanagment-be.git
   cd elite-ltd-eventmanagment-be
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and update it with your MongoDB URI and any other configuration settings needed.

   ```plaintext
   DATABASE_URL=mongodb://localhost:27017/eventmanagement
   PORT=5000
   ```

4. **Start the server**

   ```bash
   npm start
   ```

   The server will start running on [http://localhost:5000](http://localhost:5000).

## API Endpoints

Here is a brief overview of the API endpoints included in this backend:

https://etite-ltd-eventmanagment-be.onrender.com/api/v1/docs/


## Contributing

We welcome contributions to this project! If you'd like to contribute, please fork the repository and submit a pull request.
