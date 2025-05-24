class ATMCommands {
  constructor() {
    this.keys = window.keyConfigStore.getState().keyConfig.keyConfig;

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
