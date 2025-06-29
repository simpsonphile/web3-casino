import PlinkoMachineInteraction from "./PlinkoMachineInteraction";
import PlinkoMachineController from "./PlinkoMachineController";
import PlinkoMachineCommands from "./PlinkoMachineCommands";

class PlinkoMachineMode {
  constructor({ game }) {
    this.game = game;
  }

  init() {
    this.controller = new PlinkoMachineController();
    this.commands = new PlinkoMachineCommands(this.controller);
    this.interaction = new PlinkoMachineInteraction({
      game: this.game,
      controller: this.controller,
    });
  }
}

export default PlinkoMachineMode;
