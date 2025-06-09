import AuthRoom from "../../rooms/AuthRoom.js";
import { SERVER_MESSAGES, CLIENT_MESSAGES } from "./ChatMessages.js";
import ChatState from "./ChatState.js";
import User from "../../database/models/User.js";

class ChatRoom extends AuthRoom {
  onCreate() {
    this.setState(new ChatState());

    this.onMessage(CLIENT_MESSAGES.MESSAGE, (client, message) => {
      this.state.addMessage(client.sessionId, message);

      if (!message.value) return;

      this.broadcast(SERVER_MESSAGES.NEW_MESSAGE, this.state.getLastMessage());
    });
  }

  async onJoin(client, options) {
    const { address, asGuest, nickname } = options;
    const user = asGuest ? { nickname } : await User.findOne({ address });

    this.state.addUser(client.sessionId, user.nickname);
    this.state.addJoinMessage(client.sessionId);
    this.broadcast(SERVER_MESSAGES.NEW_MESSAGE, this.state.getLastMessage(), {
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
