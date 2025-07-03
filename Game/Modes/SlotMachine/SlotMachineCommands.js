class SlotMachineCommands {
  constructor(slotMachineController) {
    this.slotMachineController = slotMachineController;
    this.keys = window.keyConfigStore.getState().keyConfig.keyConfig;

    this.addCommands();
  }

  addCommands() {
    window.commandManager.addCommand(
      "slotMachine",
      "spin",
      this.keys.slotMachine.spin,
      null,
      () => {
        this.slotMachineController.spinOnce();
      }
    );

    window.commandManager.addCommand(
      "slotMachine",
      "exit",
      this.keys.slotMachine.exit,
      () => {
        window.commandManager.setMode("movement");
        window.interactionHandler.setState(true);
        window.player.switchCameraMode("third-person");
        this.slotMachineController.leave();
      }
    );

    window.commandManager.addCommand(
      "slotMachine",
      "increaseBet",
      this.keys.slotMachine.increaseBet,
      null,
      () => {
        this.slotMachineController.increaseBet();
      }
    );
    window.commandManager.addCommand(
      "slotMachine",
      "decreaseBet",
      this.keys.slotMachine.decreaseBet,
      null,
      () => {
        this.slotMachineController.decreaseBet();
      }
    );
    window.commandManager.addCommand(
      "slotMachine",
      "help",
      this.keys.slotMachine.help,
      () => {
        this.slotMachineController.showHelp();
      }
    );
    window.commandManager.addCommand(
      "slotMachine",
      "goBack",
      this.keys.slotMachine.goBack,
      () => {
        this.slotMachineController.goBack();
      }
    );
  }
}

export default SlotMachineCommands;
