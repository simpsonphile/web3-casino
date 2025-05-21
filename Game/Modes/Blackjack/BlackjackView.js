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
  new THREE.Euler(-3.14, 0.94, -3.14),
  new THREE.Euler(-3.14, 0.47, -3.14),
];

class BlackjackView {
  constructor({ object3d }) {
    this.object3d = object3d;
    this.group = new THREE.Group();

    this.players = {};
    this.playersOrder = [];

    this.dealerHand = [];
    this.dealerMeshGroup = new THREE.Group();

    this.group.add(this.dealerMeshGroup);

    window.scene.add(this.group);

    this._prepareSlots();
    this._prepareNpc();
    this._tempQuests();
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
    this.group.remove(this.dealerMeshGroup);
    this.dealerMeshGroup = new THREE.Group();
    this.group.add(this.dealerMeshGroup);
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
    v.y = 0;
    this.npc.position.copy(v);

    this.npc.runIdleAnimation();
    this.npc.lookAtY(this.object3d.position);
    this.group.add(this.npc);

    window.deltaUpdater.add(this.npc.updateMixer.bind(this.npc));
  }

  _tempQuests() {
    this.seatSlots.forEach((slot, i) => {
      const dude = new BusinessMan();
      const v = new THREE.Vector3().copy(slot);
      v.y = 0;
      dude.position.copy(v);
      dude.lookAtY(this.object3d.position);
      this.group.add(dude);
      this.createPlayer(i);
      this.giveCardToPlayer(i, "heart_2");
      this.giveCardToPlayer(i, "heart_2");
      this.giveCardToPlayer(i, "heart_2");
      this.giveCardToPlayer(i, "heart_2");
      this.giveChipsToPlayer(i, 123);
    });
  }

  _prepareSlots() {
    this.cardSlots = slots.map((slot, i) => {
      const pos = new THREE.Vector3();
      pos.copy(slot);
      return pos;
    });

    this.seatSlots = slots.map((slot, i) => {
      const pos = new THREE.Vector3();
      const rotation = slotRotations[i];
      const quat = new THREE.Quaternion().setFromEuler(rotation);
      const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(quat);
      const movedPos = pos.clone().add(forward.multiplyScalar(1.5));
      movedPos.applyMatrix4(this.object3d.matrixWorld);
      return movedPos;
    });

    this.chipSlots = slots.map((slot) => {
      const pos = new THREE.Vector3();
      pos.copy(slot);
      pos.x += 0.1;
      return pos;
    });

    this.dealerSlot = new THREE.Vector3(0, 0.1, 0).applyMatrix4(
      this.object3d.matrixWorld
    );
  }

  createCard({ cardName, pos, index, rotation = 0 }) {
    const newPos = new THREE.Vector3().copy(pos);
    newPos.x -= index * 0.02;
    newPos.z += index * 0.02;
    newPos.y += index * 0.0001;

    const card = new Card({ name: cardName });

    card.position.copy(newPos);
    card.applyMatrix4(this.object3d.matrixWorld);
    return card;
  }

  giveCardToDealer(cardName) {
    const card = this.createCard({
      cardName,
      pos: this.dealerSlot,
      index: this.dealerHand.length,
    });

    console.log(card);

    this.dealerHand.push(cardName);
    this.dealerMeshGroup.add(card);
  }

  giveCardToPlayer(id, cardName) {
    const { hand, meshGroup } = this.players[id];
    const index = this.playersOrder.indexOf(id);
    const pos = this.cardSlots[index];

    const card = this.createCard({
      cardName,
      pos,
      index: hand.length,
      rotation: slotRotations[index],
    });

    hand.push(cardName);
    meshGroup.add(card);
  }

  giveChipsToPlayer(id, newBet) {
    const { bet, meshGroup } = this.players[id];
    const index = this.playersOrder.indexOf(id);
    const pos = new THREE.Vector3().copy(this.chipSlots[index]);

    if (bet > 0) pos.x -= 0.04;
    newBet -= bet;

    const chips = getChipsForBet(newBet);
    const stacksOfChips = groupChips(chips);

    stacksOfChips.forEach((group, i) => {
      group.forEach((name, j) => {
        const chip = new Chip({ name });
        const newPos = new THREE.Vector3().copy(pos);
        newPos.z += i * 0.04 + (0.5 - Math.random()) * 0.005;
        newPos.y += j * 0.0033;
        newPos.x += (0.5 - Math.random()) * 0.005;
        newPos.applyMatrix4(this.object3d.matrixWorld);

        chip.position.copy(newPos);
        meshGroup.add(chip);
      });
    });

    this.updatePlayerBet(id, newBet);
  }

  updatePlayerBet(id, newBet) {
    this.players[id].bet += newBet;
  }

  getPlayerSeatPosition(id) {
    const index = this.playersOrder.indexOf(id);
    const pos = this.seatSlots[index];
    pos.y = 0;

    return pos;
  }

  deletePlayer(id) {
    const index = this.playersOrder.indexOf(id);
    this.playersOrder.splice(index, 1);

    this.cleanPlayerMeshGroup(id);

    delete this.players[id];
  }
}

export default BlackjackView;
