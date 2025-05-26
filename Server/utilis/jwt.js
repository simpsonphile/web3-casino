import jwt from "jsonwebtoken";

export const generateAccessToken = (address) => {
  return jwt.sign({ address }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const getAddressFromToken = (token) => {
  if (!token) return false;
  try {
    const payload = verifyAccessToken(token);

    if (payload.address) return payload.address;

    return false;
  } catch (err) {
    console.error(err);

    return false;
  }
};
