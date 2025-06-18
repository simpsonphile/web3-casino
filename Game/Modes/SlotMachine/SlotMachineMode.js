import SlotMachineCommands from "./SlotMachineCommands";
import SlotMachineController from "./SlotMachineController";
import SlotMachineInteraction from "./SlotMachineInteraction";

class SlotMachineMode {
  constructor({ game }) {
    this.game = game;
  }

  init() {
    this.slotMachineController = new SlotMachineController();
    this.slotMachineInteraction = new SlotMachineInteraction({
      game: this.game,
      controller: this.slotMachineController,
    });
    this.slotMachineCommands = new SlotMachineCommands(
      this.slotMachineController
    );
  }
}

export default SlotMachineMode;
