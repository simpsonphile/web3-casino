import { Command } from "@colyseus/command";
import { SERVER_MESSAGES } from "../../messageTypes.js";
import { getRandomCard } from "../../../Common/utilis/getRandomCard.js";
import { countCardPoints } from "../../../Common/utilis/countCardPoints.js";

export class HitCommand extends Command {
  doubleBet(id) {
    this.state.doubleBet(id);
    this.room.broadcast(SERVER_MESSAGES.BLACKJACK_PLAYER_BET_UPDATE, {
      id,
      bet: this.state.getBet(id),
    });
  }

  dealCard(client) {
    const id = client.sessionId;
    const card = getRandomCard();
    this.state.addCard(id, card);

    this.room.broadcast(SERVER_MESSAGES.BLACKJACK_PLAYER_HAND_UPDATE, {
      id,
      card,
    });
    client.send(SERVER_MESSAGES.BLACKJACK_HIT_ACCEPTED);
  }

  checkCondition(id, isDouble) {
    const cards = this.state.getPlayerCards(id);
    const points = countCardPoints(cards);

    if (points === 21) {
      this.state.setPlayerState(id, "win");
    } else if (points < 21) {
      this.state.setPlayerState(id, isDouble ? "stand" : "hit");
    } else if (points > 21) {
      this.state.setPlayerState(id, "lose");
    }

    if (points === 21 || points > 21 || isDouble) {
      this.state.nextTurn();
      this.room.broadcast(
        SERVER_MESSAGES.BLACKJACK_TURN_CHANGE,
        this.state.turn
      );
    }

    this.room.broadcast(SERVER_MESSAGES.BLACKJACK_PLAYER_STATE_UPDATE, {
      id,
      state: this.state.getPlayerState(id),
    });
  }

  execute({ client, isDouble = false }) {
    const id = client.sessionId;
    if (
      this.state.step === "hit" &&
      this.state.getPlayerState(id) === "hit" &&
      this.state.turn === id
    ) {
      if (isDouble) {
        this.doubleBet(id);
      }
      this.dealCard(client);
      this.checkCondition(id, isDouble);
    }
  }
}
