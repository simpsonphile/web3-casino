class SlotMachineCommands {
  constructor() {
    this.keys = window.keyConfig.get();

    this.addCommands();
  }

  addCommands() {
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
