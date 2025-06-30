import { generateAccessToken } from "../utilis/jwt.js";
import verifySignature from "../utilis/verifySignature.js";

const isProd = process.env.IS_PROD === "true" ? true : false;

export const auth = async (req, res) => {
  const { address, signature, message } = req.body;

  const isProperlySigned = await verifySignature(address, signature, message);

  if (!isProperlySigned)
    return res
      .status(401)
      .json({ success: false, message: "Authentication failed" });

  const accessToken = generateAccessToken(address);

  res.cookie("authToken", accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "None" : "Lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.json({ success: true, message: "Authenticated" });
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "None" : "Lax",
    });
    return res.json({ success: true, message: "User logged out" });
  } catch {
    return res.status(500);
  }
};
