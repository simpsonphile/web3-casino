import { Schema, defineTypes } from "@colyseus/schema";

class ChatUser extends Schema {
  constructor({ id, nickname }) {
    super();
    this.id = id;
    this.nickname = nickname;
  }
}

defineTypes(ChatUser, {
  id: "string",
  nickname: "string",
});

export default ChatUser;
