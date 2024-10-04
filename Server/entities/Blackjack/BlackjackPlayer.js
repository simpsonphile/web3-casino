import { Schema, defineTypes } from "@colyseus/schema";

class BlackjackPlayer extends Schema {
  constructor(nickname) {
    super();
    this.nickname = nickname;
  }
}

defineTypes(BlackjackPlayer, {
  nickname: "string",
});

export default BlackjackPlayer;
