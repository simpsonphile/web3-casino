import { Command } from "@colyseus/command";
import { SERVER_MESSAGES } from "../BlackjackMessages.js";
import { BlackjackGamePlayerData } from "../entities/index.js";
export class StartGameCommand extends Command {
  execute() {
    this.state.createNewGame();

    for (let [id] of this.state.players) {
      this.state.currentGame[id] = new BlackjackGamePlayerData();
    }

    this.state.changeStep("bet");
    this.room.broadcast(
      SERVER_MESSAGES.BLACKJACK_NEW_GAME,
      this.state.currentGame
    );
    this.room.broadcast(SERVER_MESSAGES.BLACKJACK_STEP_CHANGE, this.state.step);
    this.room.broadcast(SERVER_MESSAGES.BLACKJACK_TURN_CHANGE, this.state.turn);
  }
}
