import User from "../database/models/User.js";
import { getAddressFromToken } from "../utilis/jwt.js";

export const checkWalletAddress = async (req, res) => {
  const address = getAddressFromToken(req.cookies.authToken);

  if (!address)
    return res
      .status(401)
      .json({ isAuthorized: false, success: false, message: "Unauthorized" });

  try {
    const user = await User.findOne({ address });

    if (user) return res.json({ isAuthorized: true, exists: true, user });
    return res.json({ isAuthorized: true, exists: false });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const registerNickname = async (req, res) => {
  const { nickname } = req.body;
  const address = getAddressFromToken(req.cookies.authToken);

  if (!address)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  if (!nickname)
    return res
      .status(400)
      .json({ success: false, message: "Nickname is required" });

  try {
    const userWithNickname = await User.findOne({ nickname });

    if (userWithNickname)
      return res
        .status(400)
        .json({ success: false, message: "Nickname is taken" });

    const userWithAddress = await User.findOne({ address });
    if (userWithAddress)
      return res.status(400).json({
        success: false,
        message: "You are already registered with this wallet address",
      });

    const newUser = new User({ nickname, address });
    newUser.save();

    return res.json({
      success: true,
      message: `User with nickname ${nickname} created successfully`,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
