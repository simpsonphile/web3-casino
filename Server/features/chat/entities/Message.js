import { Schema, defineTypes } from "@colyseus/schema";

class Message extends Schema {
  constructor({ nickname, value, type = "normal" }) {
    super();
    this.nickname = nickname;
    this.timestamp = new Date().getTime();
    this.value = value;
    this.type = type;
  }
}

defineTypes(Message, {
  nickname: "string",
  timestamp: "number",
  value: "string",
  type: "string",
});

export default Message;
