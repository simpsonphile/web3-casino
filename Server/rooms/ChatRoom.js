import AuthRoom from "./AuthRoom.js";
import { SERVER_MESSAGES, CLIENT_MESSAGES } from "../messageTypes.js";
import ChatState from "../states/ChatState.js";
import User from "../database/models/User.js";

class ChatRoom extends AuthRoom {
  onCreate(options) {
    this.setState(new ChatState());

    this.onMessage(CLIENT_MESSAGES.MESSAGE, (client, message) => {
      this.state.addMessage(client.sessionId, message);

      if (!message.value) return;

      this.broadcast(SERVER_MESSAGES.NEW_MESSAGE, this.state.getLastMessage());
    });
  }

  async onJoin(client, options) {
    const { address } = options;
    const user = await User.findOne({ address });
    this.state.addUser(client.sessionId, user.nickname);
    this.state.addJoinMessage(client.sessionId);
    this.broadcast(SERVER_MESSAGES.NEW_MESSAGE, this.state.getLastMessage(), {
      except: client,
    });
  }

  onLeave(client, consented) {
    this.state.removeUser(client.sessionId);
  }

  onDispose() {
    console.log("ChatRoom disposed.");
  }
}

export default ChatRoom;
