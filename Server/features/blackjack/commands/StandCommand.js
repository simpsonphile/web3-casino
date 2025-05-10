import { Command } from "@colyseus/command";
import { SERVER_MESSAGES } from "../BlackjackMessages.js";

export class StandCommand extends Command {
  execute({ client }) {
    const id = client.sessionId;
    if (
      this.state.step === "hit" &&
      this.state.currentGame[id] &&
      this.state.turn === id
    ) {
      this.state.currentGame[id].state = "stand";
      this.state.nextTurn();

      this.room.broadcast(
        SERVER_MESSAGES.BLACKJACK_PLAYER_STATE_UPDATE,
        this.state.currentGame[id].state
      );

      this.room.broadcast(
        SERVER_MESSAGES.BLACKJACK_TURN_CHANGE,
        this.state.turn
      );

      client.send(SERVER_MESSAGES.BLACKJACK_STAND_ACCEPTED);
    }
  }
}
