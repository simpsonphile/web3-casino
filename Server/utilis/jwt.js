import jwt from "jsonwebtoken";

const SECRET_KEY = "219031390302@AWDJoi#JIFOrjreio1029SJAOWIwidjwqoij";

export const generateAccessToken = (address) => {
  return jwt.sign({ address }, SECRET_KEY, { expiresIn: "24h" });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
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
