const MAX_PLAYERS = 4;

class Blackjack {
  constructor() {
    this.currentPlayers = 0;
    this.object3d = null;

    this.players = [];
  }

  join({ object3d, roomId }) {
    this.object3d = object3d;

    window.repo.get(roomId).connect();
  }

  leave() {
    window.repo.get(roomId).disconnect();
  }
}

export default Blackjack;
