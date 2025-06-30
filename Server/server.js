import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./database/config/database.js";
import createCollyseusServer from "./collyseusServer.js";
import router from "./routes.js";
import http from "http";

const app = express();
const server = http.createServer(app);

connectDB();

app.use(
  cors({
    origin: process.env.FRONT_URL,
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONT_URL); // Client's origin
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/", router);

createCollyseusServer(app, server);

console.log(`Websocket Server listening on ${process.env.VITE_WEBSOCKET_URL}`);
console.log(`Server listening on ${process.env.VITE_SERVER_URL}`);
