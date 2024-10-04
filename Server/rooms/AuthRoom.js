import colyseus from "colyseus";
const { Room } = colyseus;

// import { verifyAccessToken } from "../utilis/jwt.js";

class AuthRoom extends Room {
  onAuth(client) {
    console.log("onAuth");

    // const { authToken } = client;
    // return verifyAccessToken(authToken);
    return true;
  }
}

export default AuthRoom;
