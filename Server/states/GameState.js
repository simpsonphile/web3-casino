import { Schema, defineTypes } from "@colyseus/schema";
import { Player } from "../entities/index.js";

class GameState extends Schema {
  constructor() {
    super();
    this.players = {};
  }

  addPlayer(id, { nickname, position }) {
    this.players[id] = new Player({ nickname, position });
  }

  removePlayer(id) {
    delete this.players[id];
  }

  updatePosition(id, pos) {
    const player = this.players[id];
    player.position.x = pos.x;
    player.position.y = pos.y;
    player.position.z = pos.z;
  }

  updateRotation(id, rotation) {
    const player = this.players[id];
    player.rotation.x = rotation.x;
    player.rotation.y = rotation.y;
    player.rotation.z = rotation.z;
  }

  updateAnimation(id, animation) {
    const player = this.players[id];
    player.animation = animation;
  }

  updateNickname(id, nickname) {
    const player = this.player[id];
    player.nickname = nickname;
  }
}

defineTypes(GameState, {
  players: { map: Player },
});

export default GameState;
