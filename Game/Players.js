import * as THREE from "three";
import BusinessMan from "./Models/BusinessMan";

class Players {
  constructor() {
    this.players = {};
    this.playersGroup = new THREE.Group();
    this.playersGroup.name = "players_group";
  }

  createNewPlayer(id, nickname, position) {
    const newPlayer = new BusinessMan({ nickname });
    newPlayer.setPosition(position);
    this.players[id] = newPlayer;

    this.playersGroup.add(newPlayer.model);
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

        player.model.position.set(position.x, position.y, position.z);
        player.model.rotation.set(rotation.x, rotation.y, rotation.z);

        this.updatePlayerAnimation(id, animation);
      }
    );
  }

  updatePlayerAnimation(id, animation) {
    const player = this.players[id];

    switch (animation) {
      case "Run":
        player.runAnimation();
        break;
      case "Walk":
        player.walkAnimation();
        break;
      case "Idle":
      default:
        player.idleAnimation();
        break;
    }
  }
}

export default Players;
