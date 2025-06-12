import AuthRoom from "../../rooms/AuthRoom.js";
import { SERVER_MESSAGES, CLIENT_MESSAGES } from "./ChatMessages.js";
import ChatState from "./ChatState.js";
import User from "../../database/models/User.js";

class ChatRoom extends AuthRoom {
  onCreate() {
    this.setState(new ChatState());

    this.onMessage(CLIENT_MESSAGES.MESSAGE, (client, messageTxt) => {
      const message = this.state.addMessage(client.sessionId, messageTxt);

      if (!message.value) return;

      this.broadcast(SERVER_MESSAGES.NEW_MESSAGE, message);
    });
  }

  async onJoin(client, options) {
    const { address, asGuest, nickname } = options;
    const user = asGuest
      ? { nickname, id: nickname }
      : await User.findOne({ address });

    this.state.addUser(client.sessionId, user);
    const message = this.state.addJoinMessage(client.sessionId);
    this.broadcast(SERVER_MESSAGES.NEW_MESSAGE, message, {
      except: client,
    });
  }

  onLeave(client) {
    this.state.removeUser(client.sessionId);
  }

  onDispose() {
    console.log("ChatRoom disposed.");
  }
}

export default ChatRoom;
