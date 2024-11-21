import { Command } from "@colyseus/command";
import { SERVER_MESSAGES } from "../../messageTypes.js";
import { getRandomCard } from "../../../Common/utilis/getRandomCard.js";
import { countCardPoints } from "../../../Common/utilis/countCardPoints.js";

export class HitCommand extends Command {
  doubleBet(id) {
    this.state.doubleBet(id);
    this.room.broadcast(
      SERVER_MESSAGES.BLACKJACK_PLAYER_BET_UPDATE,
      this.state.getBet(id)
    );
  }

  dealCard(id) {
    const card = getRandomCard();
    this.state.addCard(id, card);

    console.log("dealCard", card);

    this.room.broadcast(SERVER_MESSAGES.BLACKJACK_PLAYER_HAND_UPDATE, {
      id,
      card,
    });
  }

  checkCondition(id, isDouble) {
    const cards = this.state.getPlayerCards(id);
    console.log(cards);
    const points = countCardPoints(cards);
    console.log(points);

    if (points === 21) {
      this.state.setPlayerState(id, "won");
    } else if (points < 21) {
      this.state.setPlayerState(id, isDouble ? "stand" : "hit");
    } else if (points > 21) {
      this.state.setPlayerState(id, "lose");
    }

    if (points === 21 || points > 21 || isDouble) {
      this.state.nextTurn();
    }

    this.room.broadcast(
      SERVER_MESSAGES.BLACKJACK_PLAYER_STATE_UPDATE,
      this.state.currentGame[id].state
    );
    this.room.broadcast(SERVER_MESSAGES.BLACKJACK_TURN_CHANGE, this.state.turn);
  }

  execute({ id, isDouble = false }) {
    console.log();
    if (
      this.state.step === "hit" &&
      this.state.currentGame[id].state === "hit" &&
      this.state.turn === id
    ) {
      this.doubleBet(id);
      this.dealCard(id);
      this.checkCondition(id, isDouble);
    }
  }
}
