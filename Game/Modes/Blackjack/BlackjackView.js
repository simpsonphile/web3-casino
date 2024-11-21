import * as THREE from "three";
import Card from "../../Models/Card";
import Chip from "../../Models/Chip";
import { getChipsForBet, groupChips } from "./helpers";

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
    console.log(this.players, id);
    const { meshGroup } = this.players[id];

    this.group.remove(meshGroup);
  }

  resetPlayer(id) {
    this.cleanPlayerMeshGroup(id);
    this.createPlayer(id);
  }

  resetTable() {
    // loop players and reset
    this.playersOrder.forEach((id) => {
      this.resetPlayer(id);
    });

    this.group.remove(this.dealerMeshGroup);
    this.dealerMeshGroup = new THREE.Group();
    this.group.add(this.dealerMeshGroup);
    this.dealerHand = [];
  }

  _calcRelativeSlotPos(slot) {
    return new THREE.Vector3().copy(slot).add(this.object3d.position);
  }

  _prepareSlots() {
    const slots = [
      new THREE.Vector3(0.5, 0.01, -1),
      new THREE.Vector3(0.5, 0.01, -0.33),
      new THREE.Vector3(0.5, 0.01, 0.33),
      new THREE.Vector3(0.5, 0.01, 1),
    ];

    const cardSlots = slots.map((slot) => slot);

    const seatSlots = slots.map((slot) => {
      const pos = new THREE.Vector3();
      pos.copy(slot);
      pos.x += 1;
      return pos;
    });

    const chipSlots = slots.map((slot) => {
      const pos = new THREE.Vector3();
      pos.copy(slot);
      pos.x += 0.1;
      return pos;
    });

    const dealerSlot = new THREE.Vector3(0, 0.01, 0);

    this.cardSlots = cardSlots.map((slot) => this._calcRelativeSlotPos(slot));

    this.seatSlots = seatSlots.map((slot) => this._calcRelativeSlotPos(slot));

    this.chipSlots = chipSlots.map((slot) => this._calcRelativeSlotPos(slot));

    this.dealerSlot = this._calcRelativeSlotPos(dealerSlot);
  }

  giveCardToDealer(cardName) {
    console.log("give card to dealer", cardName);
    const pos = this.dealerSlot;

    const card = new Card({ name: cardName });

    card.position.copy(pos);
    card.position.z += this.dealerHand.length * 0.02;
    card.position.y += this.dealerHand.length * 0.0001;

    this.dealerHand.push(cardName);
    this.dealerMeshGroup.add(card);
  }

  giveCardToPlayer(id, cardName) {
    const { hand, meshGroup } = this.players[id];
    const index = this.playersOrder.indexOf(id);
    const pos = this.cardSlots[index];

    const card = new Card({ name: cardName });
    card.position.copy(pos);
    card.position.z += hand.length * 0.02;
    card.position.y += hand.length * 0.0001;

    hand.push(cardName);
    meshGroup.add(card);
  }

  giveChipsToPlayer(id, newBet) {
    console.log(id, this.players[id]);
    const { bet, meshGroup } = this.players[id];
    const chipsCount = getChipsForBet(bet).length;
    const index = this.playersOrder.indexOf(id);
    const pos = this.chipSlots[index];

    // get array o chips from bet
    const chips = getChipsForBet(newBet);
    // every color on own stack
    const stacksOfChips = groupChips(chips);
    // map it to chips
    console.log(chips, stacksOfChips);
    stacksOfChips.forEach((group, i) => {
      group.forEach((name, j) => {
        const chip = new Chip({ name });
        chip.position.copy(pos);
        chip.position.y += (chipsCount + j) * 0.0033;
        chip.position.z += i * 0.04;

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
    console.log(this.seatSlots, index);
    const pos = this.seatSlots[index];
    pos.y = 0;

    return pos;
  }

  leave(id) {
    const index = this.playersOrder.indexOf(id);
    this.playersOrder.splice(index, 1);

    this.cleanPlayerMeshGroup(id);

    delete this.players[id];
  }
}

export default BlackjackView;
