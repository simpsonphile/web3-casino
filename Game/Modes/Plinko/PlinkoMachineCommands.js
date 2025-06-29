class PlinkoMachineCommands {
  constructor(plinkoMachineController) {
    this.plinkoMachineController = plinkoMachineController;
    this.keys = window.keyConfigStore.getState().keyConfig.keyConfig;

    this.addCommands();
  }

  addCommands() {
    window.commandManager.addCommand(
      "plinkoMachine",
      "play",
      this.keys.plinkoMachine.play,
      null,
      () => {
        this.plinkoMachineController.dropBalls();
      }
    );

    window.commandManager.addCommand(
      "plinkoMachine",
      "exit",
      this.keys.plinkoMachine.exit,
      () => {
        window.commandManager.setMode("movement");
        window.interactionHandler.setState(true);
        window.player.switchCameraMode("third-person");
        this.plinkoMachineController.leave();
      }
    );

    window.commandManager.addCommand(
      "plinkoMachine",
      "increaseBet",
      this.keys.plinkoMachine.increaseBet,
      null,
      () => {
        this.plinkoMachineController.increaseBet();
      }
    );
    window.commandManager.addCommand(
      "plinkoMachine",
      "decreaseBet",
      this.keys.plinkoMachine.decreaseBet,
      null,
      () => {
        this.plinkoMachineController.decreaseBet();
      }
    );
    window.commandManager.addCommand(
      "plinkoMachine",
      "increaseBalls",
      this.keys.plinkoMachine.increaseBalls,
      null,
      () => {
        this.plinkoMachineController.increaseBalls();
      }
    );
    window.commandManager.addCommand(
      "plinkoMachine",
      "decreaseBalls",
      this.keys.plinkoMachine.decreaseBalls,
      null,
      () => {
        this.plinkoMachineController.decreaseBalls();
      }
    );
    window.commandManager.addCommand(
      "plinkoMachine",
      "changeDifficulty",
      this.keys.plinkoMachine.changeDifficulty,
      null,
      () => {
        this.plinkoMachineController.changeDifficulty();
      }
    );
    window.commandManager.addCommand(
      "plinkoMachine",
      "help",
      this.keys.plinkoMachine.help,
      () => {
        this.plinkoMachineController.showHelp();
      }
    );
    window.commandManager.addCommand(
      "plinkoMachine",
      "goBack",
      this.keys.plinkoMachine.goBack,
      () => {
        this.plinkoMachineController.goBack();
      }
    );
  }
}

export default PlinkoMachineCommands;
