import { Command } from "@colyseus/command";
import { getRandomCard } from "../../../../Common/utilis/getRandomCard.js";
import { countCardPoints } from "../../../../Common/utilis/countCardPoints.js";
import { SERVER_MESSAGES } from "../BlackjackMessages.js";

export class DealInitialCardsCommand extends Command {
  dealCardToEachPlayer() {
    for (let [id] of this.state.currentGame) {
      this.clock.setTimeout(() => {
        const card = getRandomCard();
        this.state.addCard(id, card);
        this.room.broadcast(SERVER_MESSAGES.BLACKJACK_PLAYER_HAND_UPDATE, {
          id,
          card,
        });

        const cards = this.state.currentGame[id].cards;
        const points = countCardPoints(cards);

        if (points === 21) {
          this.state.currentGame[id].state = "win-early";
          this.room.broadcast(SERVER_MESSAGES.BLACKJACK_PLAYER_STATE_UPDATE, {
            id,
            state: this.state.currentGame[id].state,
          });
        }
      }, this.cardIndex * 300);
      this.cardIndex++;
    }
  }

  dealCardToDealer() {
    this.clock.setTimeout(() => {
      const dealerCard = getRandomCard();
      this.state.addDealerCard(dealerCard);
      this.room.broadcast(
        SERVER_MESSAGES.BLACKJACK_DEALER_HAND_UPDATE,
        dealerCard
      );
    }, this.cardIndex * 300);
    this.cardIndex++;
  }

  execute() {
    this.cardIndex = 0;
    this.dealCardToEachPlayer();
    this.dealCardToDealer();
    this.dealCardToEachPlayer();

    this.state.changeStep("hit");
    this.room.broadcast(SERVER_MESSAGES.BLACKJACK_STEP_CHANGE, this.state.step);
  }
}
