import { Command } from "@colyseus/command";
import { SERVER_MESSAGES } from "../../messageTypes.js";

export class BetCommand extends Command {
  execute({ pendingBet, client }) {
    if (
      this.state.step === "bet" &&
      this.state.getBet(client.sessionId) === 0 &&
      pendingBet > 0
    ) {
      this.state.setBet(client.sessionId, pendingBet);
      this.room.broadcast(
        SERVER_MESSAGES.BLACKJACK_PLAYER_BET_UPDATE,
        {
          id: client.sessionId,
          bet: pendingBet,
        },
        { expect: client }
      );
    }
  }
}
