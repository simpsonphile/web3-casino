import * as THREE from "three";
import CasualMan from "./Models/CasualMan";
import Nickname from "./Nickname";
import ChatBubble from "./ChatBubble";

class Players {
  constructor() {
    this.players = {};
    this.nicknames = {};
    this.messages = {};
    this.playersGroup = new THREE.Group();
    this.nicknamesGroup = new THREE.Group();
    this.messagesGroup = new THREE.Group();
    this.playersGroup.name = "players_group";
    this.nicknamesGroup.name = "nicknames_group";
    this.messagesGroup.name = "messages_group";

    this.listenToMessages();
  }

  listenToMessages() {
    window.messagesStore.subscribe((state) => {
      const lastMessage = state.messages[state.messages.length - 1];

      if (lastMessage.type !== "normal") return;

      const playerId = lastMessage.playerId;

      if (!playerId) return;
      if (!lastMessage.value) return;

      this.addMessage(playerId, lastMessage.value);
    });
  }

  addMessage(playerId, message) {
    const playerMessages = this.messages[playerId];

    if (!playerMessages) return;

    this.messages[playerId].traverse((children) => {
      this.messages[playerId].remove(children);
    });

    const chatBubble = new ChatBubble({ message });
    this.messages[playerId].add(chatBubble);

    setTimeout(() => {
      this.messages[playerId].remove(chatBubble);
    }, 5000);
  }

  update(delta) {
    Object.values(this.players).forEach((player) => {
      player.updateMixer(delta);
    });
  }

  createNewPlayer(id, nickname, position) {
    const newPlayer = new CasualMan({ nickname });
    const newPlayerNickname = new Nickname({ nickname, position });
    const newPlayerMessages = new THREE.Group();
    newPlayer.position.copy(position);
    this.players[id] = newPlayer;
    this.nicknames[id] = newPlayerNickname;
    this.messages[id] = newPlayerMessages;

    this.playersGroup.add(newPlayer);
    this.nicknamesGroup.add(newPlayerNickname);
    this.messagesGroup.add(newPlayerMessages);
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

  updatePlayerNicknameMesh(id, player) {
    const nickname = this.nicknames[id];

    if (!nickname) return;

    const { position, rotation } = player;

    nickname.position.copy(position);
    nickname.position.y += 2.2;
    nickname.rotation.y = rotation.y;
    nickname.lookAtY(window.camerasManager.getActiveCamera().position);
  }

  updatePlayerMessagesMesh(id, player) {
    const messages = this.messages[id];

    if (!messages) return;

    const { position, rotation } = player;

    messages.position.copy(position);
    messages.position.y += 1.9;
    messages.rotation.y = rotation.y;
    messages.lookAtY(window.camerasManager.getActiveCamera().position);
  }

  updatePlayer(id, playerData) {
    const player = this.players[id];
    if (!player) return;

    const { position, rotation, animation } = playerData;

    player.position.copy(position);
    player.rotation.y = rotation.y;

    this.updatePlayerNicknameMesh(id, player);
    this.updatePlayerMessagesMesh(id, player);

    this.updatePlayerAnimation(id, animation);
  }

  updatePlayers(players) {
    Object.entries(players).forEach(([id, player]) => {
      this.updatePlayer(id, player);
    });
  }

  updatePlayerAnimation(id, animation) {
    const player = this.players[id];

    player[`run${animation}Animation`]();
  }
}

export default Players;
