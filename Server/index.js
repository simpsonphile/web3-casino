import http from "http";
import express from "express";
import GameRoom from "./rooms/GameRoom.js";
import ChatRoom from "./rooms/ChatRoom.js";
import BlackjackRoom from "./features/blackjack/BlackjackRoom.js";
import { monitor } from "@colyseus/monitor";
import colyseus from "colyseus";
import cors from "cors";
import cookieParser from "cookie-parser";

import {
  auth,
  checkWalletAddress,
  registerNickname,
  logOut,
} from "./routes/index.js";
import connectDB from "./database/config/database.js";

const { Server } = colyseus;

const app = express();

connectDB();

app.use(
  cors({
    origin: "http://127.0.0.1:3000",
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000"); // Client's origin
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const port = 2567;
const server = http.createServer(app);

// ...
app.use("/colyseus", monitor());

app.post("/auth", auth);
app.get("/check-wallet-address", checkWalletAddress);
app.post("/register-nickname", registerNickname);
app.post("/log-out", logOut);

// Initialize Colyseus server
const gameServer = new Server({
  server: server,
});

// Register the GameRoom
gameServer.define("game_room", GameRoom);
gameServer.define("chat_room", ChatRoom);
gameServer.define("blackjack", BlackjackRoom).filterBy(["id"]);

// Start the server
gameServer.listen(port);
console.log(`Server listening on ws://127.0.0.1:${port}`);
