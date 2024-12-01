import { Command } from "@colyseus/command";
import { SERVER_MESSAGES } from "../BlackjackMessages.js";

const STEPS = ["wait", "bet", "hit", "dealer"];

export class UpdateStepCommand extends Command {
  execute(step) {
    if (STEPS.includes(step)) {
      this.state.changeStep(step);
      this.room.broadcast(
        SERVER_MESSAGES.BLACKJACK_STEP_CHANGE,
        this.state.step
      );
    }
  }
}
