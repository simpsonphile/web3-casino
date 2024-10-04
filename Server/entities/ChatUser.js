import { Schema, defineTypes } from "@colyseus/schema";

class ChatUser extends Schema {
  constructor({ nickname }) {
    super();
    this.nickname = nickname;
  }
}

defineTypes(ChatUser, {
  nickname: "string",
});

export default ChatUser;
