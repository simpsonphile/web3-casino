import express from "express";

import {
  auth,
  checkWalletAddress,
  registerNickname,
  logOut,
} from "./controllers/index.js";

const router = express.Router();

router.post("/auth", auth);

router.get("/ping", async (req, res) => {
  res.json({ status: "awake" });
});

router.get("/check-wallet-address", checkWalletAddress);
router.post("/register-nickname", registerNickname);
router.post("/log-out", logOut);

export default router;
