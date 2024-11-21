import { Command } from "@colyseus/command";
import { SERVER_MESSAGES } from "../../messageTypes.js";
import { countCardPoints } from "../../../Common/utilis/countCardPoints.js";
import { getRandomCard } from "../../../Common/utilis/getRandomCard.js";

export class DealerCommand extends Command {
  dealCard() {
    const card = getRandomCard();
    this.state.addDealerCard(card);

    this.room.broadcast(SERVER_MESSAGES.BLACKJACK_DEALER_HAND_UPDATE, card);
  }

  loopStandPlayers(type) {
    for (let [id] of this.state.currentGame) {
      const playerState = this.state.getPlayerState(id);

      if (playerState !== "stand") continue;

      if (type === "win") {
        this.state.setPlayerState(id, "win");
      } else if (type === "lose") {
        this.state.setPlayerState(id, "win");
      } else if (type === "check") {
        const state =
          countCardPoints(this.state.getPlayerCards(id)) >=
          countCardPoints(this.state.getDealerCards())
            ? "win"
            : "lose";
        this.state.setPlayerState(id, state);
      }
    }
  }

  checkCondition(id) {
    const cards = this.state.getDealerCards(id);
    console.log(cards);
    const points = countCardPoints(cards);
    console.log(points);

    if (points < 17) {
      this.pickCard = true;
    } else if (points > 21) {
      this.pickCard = false;
      this.loopStandPlayers("win");
    } else if (points === 21) {
      this.pickCard = false;
      this.loopStandPlayers("lose");
    } else if (points >= 17 && points < 21) {
      this.pickCard = false;
      this.loopStandPlayers("check");
    }
  }

  execute() {
    if (this.state.step === "dealer") {
      this.pickCard = true;
      while (this.pickCard) {
        this.dealCard();
        this.checkCondition();
      }

      this.room.broadcast(
        SERVER_MESSAGES.BLACKJACK_END_GAME_RESULTS,
        this.state.currentGame
      );
    }
  }
}
