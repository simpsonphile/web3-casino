import { Schema, defineTypes } from "@colyseus/schema";

class Message extends Schema {
  constructor({ playerId, nickname, value, type = "normal" }) {
    super();
    this.playerId = playerId;
    this.nickname = nickname;
    this.timestamp = new Date().getTime();
    this.value = value;
    this.type = type;
  }
}

defineTypes(Message, {
  playerId: "string",
  nickname: "string",
  timestamp: "number",
  value: "string",
  type: "string",
});

export default Message;
