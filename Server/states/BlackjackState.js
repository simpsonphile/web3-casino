import { ArraySchema, MapSchema, Schema, defineTypes } from "@colyseus/schema";
import { BlackjackGamePlayerData, BlackjackPlayer } from "../entities/index.js";

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

  getNickname(id) {
    const player = this.players[id];

    if (player.nickname) return player.nickname;

    console.error(`no player or player with id ${id} has no nickname`);
  }

  addPlayer(id, nickname) {
    this.players[id] = new BlackjackPlayer(nickname);
    this.order.push(id);
  }

  deleteFromOrder(id) {
    const index = this.order.indexOf(id);

    this.order.splice(index, 1);
  }

  removePlayer(id) {
    delete this.players[id];
    this.deleteFromOrder(id);
  }

  addCard(id, card) {
    this.currentGame[id].cards.push(card);
  }

  addDealerCard(card) {
    this.dealerHand.push(card);
  }

  getDealerCards() {
    return this.dealerHand;
  }

  getPlayerCards(id) {
    return this.currentGame[id].cards;
  }

  setBet(id, bet) {
    this.currentGame[id].bet = bet;
  }

  setPlayerState(id, state) {
    this.currentGame[id].state = state;
  }

  doubleBet(id) {
    this.currentGame[id].bet *= 2;
  }

  getBet(id) {
    return this.currentGame[id].bet;
  }

  getPlayerState(id) {
    return this.currentGame[id].state;
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
    const index = this.order.indexOf(this.turn);
    const nextIndex = index + 1;

    if (nextIndex > this.turn.length - 1) {
      this.step = "finish";
    }

    this.turn = this.order[(index + 1) % this.order.length];
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
