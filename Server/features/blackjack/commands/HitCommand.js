import { Command } from "@colyseus/command";
import { SERVER_MESSAGES } from "../BlackjackMessages.js";
import {
  countCardPoints,
  getRandomCard,
} from "../../../../Common/utilis/cards.js";
import payPlayer from "../utilis/payLogic.js";

export class HitCommand extends Command {
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

  checkCondition(id) {
    const cards = this.state.getPlayerCards(id);
    const points = countCardPoints(cards);
    const isDouble = this.state.getPlayerDouble(id);

    if (points === 21) {
      this.state.setPlayerState(id, "win");
      payPlayer(this.room, id);
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

  execute({ client }) {
    const id = client.sessionId;
    if (
      this.state.step === "hit" &&
      this.state.getPlayerState(id) === "hit" &&
      this.state.turn === id
    ) {
      this.dealCard(client);
      this.checkCondition(id);
    }
  }
}
