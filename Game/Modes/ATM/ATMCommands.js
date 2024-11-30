class ATMCommands {
  constructor() {
    this.keys = window.keyConfig.get();

    this.addCommands();
  }

  addCommands() {
    window.commandManager.addCommand(
      "atm",
      "exit",
      this.keys.atm.exit,
      null,
      () => {
        window.player.switchCameraMode("third-person");
        window.commandManager.setMode("movement");
      }
    );
  }
}

export default ATMCommands;
