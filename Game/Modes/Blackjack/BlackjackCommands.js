class BlackjackCommands {
  constructor(blackjackController) {
    this.blackjackController = blackjackController;

    this.keys = window.keyConfig.get();

    this.addBetCommands();
    this.addCommands();
  }

  addBetCommands() {
    [1, 2, 5, 10, 25, 50, 100, 500].forEach((bet) => {
      window.commandManager.addCommand(
        "blackjack",
        `add${bet}`,
        this.keys.blackjack[`add${bet}`],
        () => {
          console.log(bet);
          this.blackjackController.addToPendingBet(bet);
        }
      );
    });
  }

  addCommands() {
    console.log(this.keys, window.commandManager);
    window.commandManager.addCommand(
      "blackjack",
      "hit",
      this.keys.blackjack.hit,
      null,
      () => {
        console.log("hit");
        this.blackjackController.hit();
      }
    );
    window.commandManager.addCommand(
      "blackjack",
      "stand",
      this.keys.blackjack.stand,
      null,
      () => {
        this.blackjackController.stand();
      }
    );
    window.commandManager.addCommand(
      "blackjack",
      "double",
      this.keys.blackjack.double,
      null,
      () => {
        this.blackjackController.double();
      }
    );
    window.commandManager.addCommand(
      "blackjack",
      "doubleBet",
      this.keys.blackjack.doubleBet,
      null,
      () => {
        this.blackjackController.doublePendingBet();
      }
    );
    window.commandManager.addCommand(
      "blackjack",
      "halfBet",
      this.keys.blackjack.halfBet,
      null,
      () => {
        this.blackjackController.halfPendingBet();
      }
    );
    window.commandManager.addCommand(
      "blackjack",
      "accept",
      this.keys.blackjack.accept,
      null,
      () => {
        this.blackjackController.bet();
      }
    );
    window.commandManager.addCommand(
      "blackjack",
      "exit",
      this.keys.blackjack.exit,
      null,
      () => {
        this.blackjackController.leave();
        window.player.switchCameraMode("third-person");
        window.commandManager.setMode("movement");
      }
    );
  }
}

export default BlackjackCommands;
