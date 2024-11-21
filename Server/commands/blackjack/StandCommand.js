import { Command } from "@colyseus/command";
import { SERVER_MESSAGES } from "../../messageTypes.js";

export class StandCommand extends Command {
  execute({ id }) {
    if (
      this.state.step === "hit" &&
      this.state.currentGame[id] &&
      this.state.turn === id
    ) {
      this.state.currentGame[id].state = "stand";
      this.room.broadcast(
        SERVER_MESSAGES.BLACKJACK_PLAYER_STATE_UPDATE,
        this.state.currentGame[id].state
      );

      this.room.broadcast(
        SERVER_MESSAGES.BLACKJACK_TURN_CHANGE,
        this.state.turn
      );
    }
  }
}
