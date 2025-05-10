import colyseus from "colyseus";
const { Room } = colyseus;

// import { verifyAccessToken } from "../utilis/jwt.js";

class AuthRoom extends Room {
  onAuth(client) {
    // find a way to pass http only cookie
    // const { authToken } = client;
    // return verifyAccessToken(authToken);
    return true;
  }
}

export default AuthRoom;
