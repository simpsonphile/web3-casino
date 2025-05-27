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

### 4. Start the Local Blockchain Server

    npm run contracts:start

### 5. Deploy Smart Contracts

    npm run contracts:deploy

### 6. Generate Contract Hooks

Generates React hooks based on the ABIs of your smart contracts. These hooks are used in the front-end for interacting with the blockchain.

    npm run contract-hooks:generate

### 7. Start the Frontend

    npm run dev
