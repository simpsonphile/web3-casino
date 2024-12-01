import * as THREE from "three";
import Card from "../../Models/Card";
import Chip from "../../Models/Chip";
import { getChipsForBet, groupChips } from "./helpers";
import BusinessMan from "../../Models/BusinessMan";

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

    this.npc.rotateY(this.object3d.rotation.y - Math.PI / 2);
    const v = new THREE.Vector3(1.5, 0, 0);
    v.applyMatrix4(this.object3d.matrixWorld);
    v.y = 0;
    this.npc.position.copy(v);

    this.npc.runIdleAnimation();
    this.group.add(this.npc);

    window.deltaUpdater.add(this.npc.updateMixer.bind(this.npc));
  }

  _prepareSlots() {
    const seatGap = 0.6;
    const seatEdge = 0.9;
    const seatsCount = 4;
    const seatOffsetFromCenter = -0.5;

    const slots = [...new Array(seatsCount)].map((_, i) => {
      const v = new THREE.Vector3();
      const seat = seatEdge - i * seatGap;

      v.copy(new THREE.Vector3(seatOffsetFromCenter, 0.01, seat));

      return v;
    });

    this.cardSlots = slots.map((slot) => {
      const pos = new THREE.Vector3();
      pos.copy(slot);
      return pos;
    });

    this.seatSlots = slots.map((slot) => {
      const pos = new THREE.Vector3();
      pos.copy(slot);
      pos.x -= 1;
      pos.applyMatrix4(this.object3d.matrixWorld);
      return pos;
    });

    this.chipSlots = slots.map((slot) => {
      const pos = new THREE.Vector3();
      pos.copy(slot);
      pos.x -= 0.1;
      return pos;
    });

    this.dealerSlot = new THREE.Vector3(0, 0.01, 0);
  }

  createCard(cardName, pos, index) {
    const newPos = new THREE.Vector3().copy(pos);
    newPos.z += index * 0.02;
    newPos.y += index * 0.0001;
    newPos.applyMatrix4(this.object3d.matrixWorld);

    const card = new Card({ name: cardName });
    card.rotateY(this.object3d.rotation.y);

    card.position.copy(newPos);
    return card;
  }

  giveCardToDealer(cardName) {
    const card = this.createCard(
      cardName,
      this.dealerSlot,
      this.dealerHand.length
    );

    this.dealerHand.push(cardName);
    this.dealerMeshGroup.add(card);
  }

  giveCardToPlayer(id, cardName) {
    const { hand, meshGroup } = this.players[id];
    const index = this.playersOrder.indexOf(id);
    const pos = this.cardSlots[index];

    const card = this.createCard(cardName, pos, hand.length);

    hand.push(cardName);
    meshGroup.add(card);
  }

  giveChipsToPlayer(id, newBet) {
    const { bet, meshGroup } = this.players[id];
    const index = this.playersOrder.indexOf(id);
    const pos = this.chipSlots[index];

    if (bet > 0) pos.x += 0.04;
    newBet -= bet;

    const chips = getChipsForBet(newBet);
    const stacksOfChips = groupChips(chips);

    stacksOfChips.forEach((group, i) => {
      group.forEach((name, j) => {
        const chip = new Chip({ name });
        const newPos = new THREE.Vector3().copy(pos);
        newPos.z += i * 0.04;
        newPos.y += j * 0.0033;
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
