import * as THREE from "three";
import Card from "../../Models/Card";
import Chip from "../../Models/Chip";
import { getChipsForBet, groupChips } from "./helpers";
import BusinessMan from "../../Models/BusinessMan";

const slots = [
  new THREE.Vector3(-0.14, 0.1, 0.85),
  new THREE.Vector3(0.32, 0.1, 0.54),
  new THREE.Vector3(0.53, 0.1, 0.017),
  new THREE.Vector3(0.39, 0.1, -0.53),
  new THREE.Vector3(-0.03, 0.1, -0.88),
];

const slotRotations = [
  new THREE.Euler(0, 0.47, 0),
  new THREE.Euler(0, 0.94, 0),
  new THREE.Euler(0, 1.57, 0),
  new THREE.Euler(-Math.PI, 0.94, -Math.PI),
  new THREE.Euler(-Math.PI, 0.47, -Math.PI),
];

class BlackjackView {
  constructor({ object3d }) {
    this.object3d = object3d;
    this.group = new THREE.Group();
    this.height = this.object3d.getHeight();

    this.players = {};
    this.playersOrder = [];

    this.dealerHand = [];
    this.dealerMeshGroup = new THREE.Group();
    this.dealerMeshGroup.position.set(0, 0.1, 0);
    this.dealerMeshGroup.applyMatrix4(this.object3d.matrixWorld);
    this.group.add(this.dealerMeshGroup);

    window.scene.add(this.group);

    this._prepareNpc();
  }

  createPlayer(id) {
    const meshGroup = new THREE.Group();
    this.players[id] = {
      bet: 0,
      hand: [],
      meshGroup,
    };

    if (!this.playersOrder.includes(id)) {
      this.playersOrder.push(id);
    }
    const index = this.playersOrder.indexOf(id);
    const pos = slots[index];
    const rotation = slotRotations[index];
    const quat = new THREE.Quaternion().setFromEuler(rotation);
    meshGroup.position.copy(pos);
    meshGroup.applyQuaternion(quat);
    meshGroup.applyMatrix4(this.object3d.matrixWorld);
    this.group.add(meshGroup);
  }

  cleanPlayerMeshGroup(id) {
    const { meshGroup } = this.players[id];

    this.group.remove(meshGroup);
  }

  resetPlayer(id) {
    this.cleanPlayerMeshGroup(id);
    this.createPlayer(id);
  }

  resetDealer() {
    this.dealerHand = [];
    while (this.dealerMeshGroup.children.length > 0) {
      const child = this.dealerMeshGroup.children[0];
      this.dealerMeshGroup.remove(child);
    }
  }

  resetTable() {
    this.playersOrder.forEach((id) => {
      this.resetPlayer(id);
    });
    this.resetDealer();
  }

  _prepareNpc() {
    this.npc = new BusinessMan();

    const v = new THREE.Vector3(-1.5, 0, 0);
    v.applyMatrix4(this.object3d.matrixWorld);
    v.y -= this.height;
    this.npc.position.copy(v);

    this.npc.runIdleAnimation();
    this.npc.lookAtY(this.object3d.position);
    this.group.add(this.npc);

    window.deltaUpdater.add(this.npc.updateMixer.bind(this.npc));
  }

  createCard(cardName, index) {
    const card = new Card({ name: cardName });
    card.position.x -= index * 0.02;
    card.position.z += index * 0.02;
    card.position.y -= index * 0.0001;
    return card;
  }

  giveCardToDealer(cardName) {
    const card = this.createCard(cardName, this.dealerHand.length);

    this.dealerHand.push(cardName);
    this.dealerMeshGroup.add(card);
  }

  giveCardToPlayer(id, cardName) {
    const { hand, meshGroup } = this.players[id];

    const card = this.createCard(cardName, hand.length);
    card.rotateY(-Math.PI / 2);

    hand.push(cardName);
    meshGroup.add(card);
  }

  giveChipsToPlayer(id, newBet) {
    const { bet, meshGroup } = this.players[id];

    const zOffset = bet !== 0 ? 0.04 : 0;
    const betDiff = newBet - bet;

    const chips = getChipsForBet(betDiff);
    const stacksOfChips = groupChips(chips);

    stacksOfChips.forEach((group, i) => {
      group.forEach((name, j) => {
        const chip = new Chip({ name });
        chip.position.x += i * 0.04 + (0.5 - Math.random()) * 0.005;
        chip.position.y += j * 0.0033;
        chip.position.z += zOffset + 0.15 + (0.5 - Math.random()) * 0.005;
        meshGroup.add(chip);
      });
    });

    this.updatePlayerBet(id, newBet);
  }

  updatePlayerBet(id, newBet) {
    this.players[id].bet += newBet;
  }

  getPlayerSeatPosition(id) {
    const { meshGroup } = this.players[id];
    const rotation = meshGroup.rotation.clone();
    const quat = new THREE.Quaternion().setFromEuler(rotation);
    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(quat);
    const movedPos = meshGroup.position
      .clone()
      .add(forward.multiplyScalar(1.2));
    movedPos.y -= this.height;
    return movedPos;
  }

  deletePlayer(id) {
    const index = this.playersOrder.indexOf(id);
    this.playersOrder.splice(index, 1);

    this.cleanPlayerMeshGroup(id);

    delete this.players[id];
  }
}

export default BlackjackView;
