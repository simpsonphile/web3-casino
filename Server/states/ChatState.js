import { Schema, ArraySchema, defineTypes } from "@colyseus/schema";
import { Message, ChatUser } from "../entities/index.js";

class ChatState extends Schema {
  constructor() {
    super();
    this.users = {};
    this.messages = new ArraySchema();
    this.nextId = 0;
  }

  getLastMessage() {
    return this.messages[this.messages.length - 1];
  }

  getNickname(id) {
    const user = this.users[id];

    if (user.nickname) return user.nickname;

    console.error(`no user or user with id ${id} has no nickname`);
  }

  addMessage(clientId, { value }) {
    if (!value) return;
    const nickname = this.getNickname(clientId);
    if (!nickname) return;
    this.messages.push(new Message({ nickname, value }));
  }

  addJoinMessage(clientId) {
    const nickname = this.getNickname(clientId);
    this.messages.push(new Message({ nickname, type: "join" }));
  }

  addUser(id, nickname) {
    this.users[id] = new ChatUser({ nickname });
  }

  removeUser(id) {
    delete this.users[id]; // todo .remove
  }
}

defineTypes(ChatState, {
  messages: [Message],
  users: { map: ChatUser },
});

export default ChatState;
