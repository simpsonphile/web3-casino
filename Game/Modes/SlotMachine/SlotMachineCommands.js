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
        const getRandomBetween = (min, max) => {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const slots = [
          getRandomBetween(0, 14),
          getRandomBetween(0, 14),
          getRandomBetween(0, 14),
          getRandomBetween(0, 14),
          getRandomBetween(0, 14),
        ];

        this.slotMachineController.spin(slots.join(","));
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
  }
}

export default SlotMachineCommands;
