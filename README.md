# Web3 Casino

**Live version:**  
[https://web3-casino.onrender.com](https://web3-casino.onrender.com)

## Getting Started Locally

### 1. Setup Environment Variables

Create a `.env` file in the root directory. Use the provided `.env.example` as a template.

### 2. Install Dependencies

    npm install

### 3. Start the Backend Server

This starts the server, including the database connection, API routes, and WebSocket integration.

    npm run server:dev

> **Note:** MongoDB must be installed locally, or a MongoDB connection URI should be set in your `.env` file.

### 4. (Optional) Smart Contracts

These steps are optional and not required for the app to function currently.

Start a local blockchain server:

    npm run contracts:start

Deploy smart contracts to the local blockchain:

    npm run contracts:deploy

### 5. Start the Frontend

This launches the front-end application.

    npm run dev
