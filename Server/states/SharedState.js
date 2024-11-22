class SharedState {
  constructor() {
    this.players = {};
  }

  addPlayer(sessionId, nickname) {
    if (!this.players[sessionId]) {
      this.players[sessionId] = {
        nickname,
      };
    }
  }

  removePlayer(sessionId) {
    delete this.players[sessionId]; // todo .remove
  }

  getPlayer(sessionId) {
    return this.players[sessionId];
  }
}

export default new SharedState();
