import { Schema, defineTypes } from "@colyseus/schema";
import { Player } from "./entities/index.js";

class GameState extends Schema {
  constructor() {
    super();
    this.players = {};
    this.sessionIdToPlayerId = {};
  }

  getPlayerId(sessionId) {
    return this.sessionIdToPlayerId[sessionId];
  }

  addPlayer(sessionId, { id, nickname, position }) {
    this.players[id] = new Player({ id, nickname, position });
    this.sessionIdToPlayerId[sessionId] = id;
  }

  removePlayer(sessionId) {
    delete this.players[this.getPlayerId(sessionId)];
  }

  updatePosition(sessionId, pos) {
    const id = this.getPlayerId(sessionId);
    const player = this.players[id];
    player.position.x = pos.x;
    player.position.y = pos.y;
    player.position.z = pos.z;
  }

  updateRotation(sessionId, rotation) {
    const id = this.getPlayerId(sessionId);
    const player = this.players[id];
    player.rotation.x = rotation.x;
    player.rotation.y = rotation.y;
    player.rotation.z = rotation.z;
  }

  updateAnimation(sessionId, animation) {
    const id = this.getPlayerId(sessionId);
    const player = this.players[id];
    player.animation = animation;
  }

  updateNickname(sessionId, nickname) {
    const id = this.getPlayerId(sessionId);
    const player = this.player[id];
    player.nickname = nickname;
  }
}

defineTypes(GameState, {
  sessionIdToPlayerId: { map: "string" },
  players: { map: Player },
});

export default GameState;
