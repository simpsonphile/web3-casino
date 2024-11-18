import * as THREE from "three";
import BusinessMan from "./Models/BusinessMan";

class Players {
  constructor() {
    this.players = {};
    this.playersGroup = new THREE.Group();
    this.playersGroup.name = "players_group";
  }

  update(delta) {
    Object.values(this.players).forEach((player) => {
      player.updateMixer(delta);
    });
  }

  createNewPlayer(id, nickname, position) {
    const newPlayer = new BusinessMan({ nickname });
    newPlayer.position.copy(position);
    this.players[id] = newPlayer;

    this.playersGroup.add(newPlayer);
  }

  createNewPlayers(players) {
    Object.entries(players).forEach(([id, { position, nickname }]) => {
      const player = players[id];
      if (!player) return;

      this.createNewPlayer(id, nickname, position);
    });
  }

  deletePlayer(id) {
    this.playersGroup.remove(this.players[id]);
  }

  updatePlayers(players) {
    Object.entries(players).forEach(
      ([id, { position, rotation, animation }]) => {
        const player = this.players[id];
        if (!player) return;

        player.position.copy(position);
        player.rotation.y = rotation.y;

        this.updatePlayerAnimation(id, animation);
      }
    );
  }

  updatePlayerAnimation(id, animation) {
    const player = this.players[id];

    switch (animation) {
      case "Run":
        player.runRunAnimation();
        break;
      case "Walk":
        player.runWalkAnimation();
        break;
      case "Idle":
      default:
        player.runIdleAnimation();
        break;
    }
  }
}

export default Players;
