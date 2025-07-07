import { ArraySchema, MapSchema, Schema, defineTypes } from "@colyseus/schema";
import { BlackjackGamePlayerData, BlackjackPlayer } from "./entities/index.js";

class BlackjackState extends Schema {
  constructor() {
    super();
    this.step = "wait";
    this.players = new MapSchema();
    this.order = new ArraySchema();
    this.createNewGame();
  }

  createNewGame() {
    this.turn = this.order[0];
    this.dealerHand = new ArraySchema();
    this.currentGame = new MapSchema();
  }

  changeStep(step) {
    this.step = step;
  }

  getBalance(id) {
    const player = this.players[id];

    if (typeof player.balance === "number") return player.balance;

    console.error(`no player or player with id ${id} has no balance`);
  }

  getAddress(id) {
    const player = this.players[id];

    if (player.address) return player.address;

    console.error(`no player or player with id ${id} has no address`);
  }

  checkIfGuest(id) {
    const player = this.players[id];

    if (player.asGuest) return player.asGuest;

    console.error(`no player or player with id ${id} has no asGuest`);
  }

  getNickname(id) {
    const player = this.players[id];

    if (player.nickname) return player.nickname;

    console.error(`no player or player with id ${id} has no nickname`);
  }

  addPlayer(id, options) {
    this.players[id] = new BlackjackPlayer(options);
    this.order.push(id);
  }

  deleteFromOrder(id) {
    const index = this.order.indexOf(id);
    if (index === -1) return;

    this.order.splice(index, 1);
  }

  removePlayer(id) {
    if (this.players.has(id)) {
      delete this.players[id];
    }

    if (this.currentGame.has(id)) {
      delete this.currentGame[id];
    }

    this.deleteFromOrder(id);
  }

  addCard(id, card) {
    if (!this.currentGame.has(id)) return;
    this.currentGame[id].cards.push(card);
  }

  addDealerCard(card) {
    this.dealerHand.push(card);
  }

  getDealerCards() {
    return this.dealerHand;
  }

  getPlayerCards(id) {
    if (!this.currentGame.has(id)) return;
    return this.currentGame[id].cards;
  }

  setBet(id, bet) {
    if (!this.currentGame.has(id)) return;
    this.currentGame[id].bet = bet;
  }

  setPlayerState(id, state) {
    if (!this.currentGame.has(id)) return;
    this.currentGame[id].state = state;
  }

  doubleBet(id) {
    if (!this.currentGame.has(id)) return;
    this.currentGame[id].bet *= 2;
    this.currentGame[id].isDouble = true;
  }

  getBet(id) {
    if (!this.currentGame.has(id)) return;
    return this.currentGame[id].bet;
  }

  getPlayerDouble(id) {
    if (!this.currentGame.has(id)) return;
    return this.currentGame[id].isDouble;
  }

  getPlayerState(id) {
    if (!this.currentGame.has(id)) return;
    return this.currentGame[id].state;
  }

  addToBalance(id, payout) {
    const player = this.players[id];

    if (typeof player.balance === "number") {
      player.addToBalance(payout);
      return;
    }

    console.error(`no player or player with id ${id} has no balance`);
  }

  isAllBet() {
    for (let [id] of this.currentGame) {
      if (this.getBet(id) === 0) return false;
    }

    return true;
  }

  isAllHit() {
    for (let [id] of this.currentGame) {
      if (this.getPlayerState(id) === "hit") return false;
    }

    return true;
  }

  nextTurn() {
    if (this.order.length === 0) return;

    const currentIndex = this.order.indexOf(this.turn);
    let nextIndex = currentIndex + 1;
    let id = this.order[nextIndex];

    while (!this.currentGame.has(id)) {
      if (nextIndex > this.order.length - 1) {
        this.step = "finish";
        return;
      }

      nextIndex++;
      id = this.order[nextIndex];
    }

    this.turn = id;
  }
}

defineTypes(BlackjackState, {
  step: "string",
  players: { map: BlackjackPlayer },
  order: ["string"],
  turn: "string",
  dealerHand: ["string"],
  currentGame: { map: BlackjackGamePlayerData },
});

export default BlackjackState;
