import { ArraySchema, MapSchema, Schema, defineTypes } from "@colyseus/schema";
import { BlackjackGamePlayerData, BlackjackPlayer } from "../entities/index.js";

class BlackjackState extends Schema {
  constructor() {
    super();
    this.players = new MapSchema();
    this.order = new ArraySchema();
    this.turn = null;
    this.dealerHand = new ArraySchema();
    this.currentGame = new MapSchema();
  }

  getNickname(id) {
    const player = this.players[id];

    if (player.nickname) return player.nickname;

    console.error(`no player or player with id ${id} has no nickname`);
  }

  addPlayer(id, nickname) {
    console.log(id, nickname);
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

  startNewGame() {
    const newGame = new MapSchema();

    for (let [id, player] of this.players.entries()) {
      newGame.addPlayer(id);
    }

    this.currentGame = newGame;
  }

  addCard(id, card) {
    this.currentGame[id].cards.push(card);
  }

  setBet(id, bet) {
    this.currentGame[id].bet = bet;
  }

  nextTurn() {
    const index = this.order.indexOf(this.turn);

    this.turn = this.order[(index + 1) % this.order.length];
  }
}

defineTypes(BlackjackState, {
  players: { map: BlackjackPlayer },
  order: ["string"],
  turn: "string",
  dealerHand: ["string"],
  currentGame: { map: BlackjackGamePlayerData },
});

export default BlackjackState;
