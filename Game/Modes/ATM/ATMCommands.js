class ATMCommands {
  constructor({ controller }) {
    this.keys = window.keyConfigStore.getState().keyConfig.keyConfig;
    this.atmStore = window.atmStore.getState();
    this.controller = controller;

    this.addCommands();
  }

  addCommands() {
    window.commandManager.addCommand(
      "atm",
      "exit",
      this.keys.atm.exit,
      null,
      () => {
        this.controller.onExit();
      }
    );
    window.commandManager.addCommand(
      "atm",
      "deposit",
      this.keys.atm.deposit,
      null,
      () => {
        this.controller.setStep("deposit");
      }
    );
    window.commandManager.addCommand(
      "atm",
      "withdraw",
      this.keys.atm.withdraw,
      null,
      () => {
        this.controller.setStep("withdraw");
      }
    );
  }
}

export default ATMCommands;
