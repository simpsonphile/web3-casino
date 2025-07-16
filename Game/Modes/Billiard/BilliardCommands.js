class BilliardCommands {
  constructor(billiardController) {
    this.billiardController = billiardController;

    this.keys = window.keyConfigStore.getState().keyConfig.keyConfig;

    this.addCommands();
  }

  addCommands() {
    window.commandManager.addCommand(
      "billiard",
      "newGame",
      this.keys.billiard.newGame,
      null,
      () => {
        this.billiardController.newGame();
      }
    );
    window.commandManager.addCommand(
      "billiard",
      "exit",
      this.keys.billiard.exit,
      null,
      () => {
        this.billiardController.exit();
        window.player.switchCameraMode("third-person");
        window.commandManager.setMode("movement");
      }
    );
  }
}

export default BilliardCommands;
