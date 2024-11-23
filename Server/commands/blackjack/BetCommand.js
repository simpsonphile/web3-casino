import { Command } from "@colyseus/command";
import { SERVER_MESSAGES } from "../../messageTypes.js";

export class BetCommand extends Command {
  execute({ pendingBet, client }) {
    const id = client.sessionId;
    if (
      this.state.step === "bet" &&
      this.state.currentGame[id] &&
      this.state.getBet(id) === 0 &&
      pendingBet > 0
    ) {
      this.state.setBet(id, pendingBet);
      this.room.broadcast(
        SERVER_MESSAGES.BLACKJACK_PLAYER_BET_UPDATE,
        {
          id,
          bet: pendingBet,
        },
        { expect: client }
      );

      client.send(SERVER_MESSAGES.BLACKJACK_BET_ACCEPTED);
    }
  }
}
