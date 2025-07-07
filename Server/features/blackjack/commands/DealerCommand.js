import { Command } from "@colyseus/command";
import { SERVER_MESSAGES } from "../BlackjackMessages.js";
import {
  countCardPoints,
  getRandomCard,
} from "../../../../Common/utilis/cards.js";
import payPlayer from "../utilis/payLogic.js";

export class DealerCommand extends Command {
  dealCard() {
    const card = getRandomCard();
    this.state.addDealerCard(card);

    this.room.broadcast(SERVER_MESSAGES.BLACKJACK_DEALER_HAND_UPDATE, card);
  }

  resolveStandingPlayers(type) {
    for (let [id] of this.state.currentGame) {
      const playerState = this.state.getPlayerState(id);

      if (playerState !== "stand") continue;

      if (type === "win") {
        this.state.setPlayerState(id, "win");
        payPlayer(this.room, id);
      } else if (type === "lose") {
        this.state.setPlayerState(id, "lose");
      } else if (type === "check") {
        const state =
          countCardPoints(this.state.getPlayerCards(id)) >=
          countCardPoints(this.state.getDealerCards())
            ? "win"
            : "lose";
        this.state.setPlayerState(id, state);
        payPlayer(this.room, id);
      }
    }
  }

  checkCondition() {
    const cards = this.state.getDealerCards();
    const points = countCardPoints(cards);

    if (points < 17) {
      this.pickCard = true;
    } else if (points > 21) {
      this.pickCard = false;
      this.resolveStandingPlayers("win");
    } else if (points === 21) {
      this.pickCard = false;
      this.resolveStandingPlayers("lose");
    } else if (points >= 17 && points < 21) {
      this.pickCard = false;
      this.resolveStandingPlayers("check");
    }
  }

  async dealCardWithDelay() {
    return new Promise((resolve) =>
      this.clock.setTimeout(() => {
        this.dealCard();
        this.checkCondition();
        resolve();
      }, this.cardIndex * 300)
    );
  }

  async execute() {
    this.cardIndex = 0;
    if (this.state.step !== "dealer") return;
    this.pickCard = true;
    while (this.pickCard) {
      await this.dealCardWithDelay();
      this.cardIndex++;
    }

    this.room.broadcast(
      SERVER_MESSAGES.BLACKJACK_END_GAME_RESULTS,
      this.state.currentGame
    );
  }
}
