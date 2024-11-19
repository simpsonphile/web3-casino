import { Schema, defineTypes } from "@colyseus/schema";

import Position from "./Position.js";

class Player extends Schema {
  constructor({ nickname, position }) {
    super();
    this.nickname = nickname;
    this.rotation = new Position(0, 0, 0);
    this.animation = "Idle";
    this.setPosition(position);
  }

  setPosition(position) {
    if (typeof position === "object") {
      this.position = new Position(position.x, position.y, position.z);
    } else {
      this.position = new Position(0, 0, 0);
    }
  }
}

defineTypes(Player, {
  nickname: "string",
  position: Position,
  rotation: Position,
  animation: "string",
});

export default Player;
