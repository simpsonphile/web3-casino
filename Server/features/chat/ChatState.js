import { Schema, ArraySchema, defineTypes } from "@colyseus/schema";
import { Message, ChatUser } from "./entities/index.js";

class ChatState extends Schema {
  constructor() {
    super();
    this.users = {};
    this.messages = new ArraySchema();
    this.nextId = 0;
  }

  getUser(sessionId) {
    const user = this.users[sessionId];

    if (user.id) return user;

    console.error(`no user with sessionId ${sessionId}`);
  }

  addMessage(sessionId, { value }) {
    if (!value) return;
    const { id, nickname } = this.getUser(sessionId) || {};
    if (!id) return;
    const message = new Message({ playerId: id, nickname, value });
    this.messages.push(message);

    return message;
  }

  addJoinMessage(sessionId) {
    const { id, nickname } = this.getUser(sessionId) || {};
    const message = new Message({ playerId: id, nickname, type: "join" });
    this.messages.push(message);

    return message;
  }

  addUser(sessionId, user) {
    this.users[sessionId] = new ChatUser({
      nickname: user.nickname,
      id: user.id,
    });
  }

  removeUser(id) {
    delete this.users[id];
  }
}

defineTypes(ChatState, {
  messages: [Message],
  users: { map: ChatUser },
});

export default ChatState;
