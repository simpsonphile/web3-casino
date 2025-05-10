import * as THREE from "three";
import CasualMan from "./Models/CasualMan";
import Nickname from "./Nickname";

class Players {
  constructor() {
    this.players = {};
    this.nicknames = {};
    this.playersGroup = new THREE.Group();
    this.nicknamesGroup = new THREE.Group();
    this.playersGroup.name = "players_group";
    this.nicknamesGroup.name = "nicknames_group";
  }

  update(delta) {
    Object.values(this.players).forEach((player) => {
      player.updateMixer(delta);
    });
  }

  createNewPlayer(id, nickname, position) {
    const newPlayer = new CasualMan({ nickname });
    const newPlayerNickname = new Nickname({ nickname, position });
    newPlayer.position.copy(position);
    this.players[id] = newPlayer;
    this.nicknames[id] = newPlayerNickname;

    this.playersGroup.add(newPlayer);
    this.nicknamesGroup.add(newPlayerNickname);
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
    this.nicknamesGroup.remove(this.nicknames[id]);
  }

  updatePlayers(players) {
    Object.entries(players).forEach(
      ([id, { position, rotation, animation }]) => {
        const player = this.players[id];
        const nickname = this.nicknames[id];
        if (!player) return;

        player.position.copy(position);
        player.rotation.y = rotation.y;

        if (!nickname) return;
        nickname.position.copy(position);
        nickname.position.y += 2;
        nickname.rotation.y = rotation.y;
        nickname.lookAtY(window.camerasManager.getActiveCamera().position);

        this.updatePlayerAnimation(id, animation);
      }
    );
  }

  updatePlayerAnimation(id, animation) {
    const player = this.players[id];

    player[`run${animation}Animation`]();
  }
}

export default Players;
