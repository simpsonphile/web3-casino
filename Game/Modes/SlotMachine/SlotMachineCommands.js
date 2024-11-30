class SlotMachineCommands {
  constructor(slotMachineController) {
    this.slotMachineController = slotMachineController;
    this.keys = window.keyConfig.get();

    this.addCommands();
  }

  addCommands() {
    window.commandManager.addCommand(
      "slotMachine",
      "spin",
      this.keys.slotMachine.spin,
      null,
      () => {
        slotMachineController.spin("10,11,12,13,14");
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
      }
    );
  }
}

export default SlotMachineCommands;
