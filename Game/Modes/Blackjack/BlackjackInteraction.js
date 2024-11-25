class BlackjackInteraction {
  constructor(game) {
    this.game = game;
    this.registerInteractions();
  }

  onMouseOver(data) {
    if (data.distance > 6) return;
    if (!this.game.commandManager.checkIfModeEnabled("movement")) return;

    this.game.showTooltip("wanna join blackjack game?");
  }

  onClick(data) {
    if (this.game.commandManager.getMode().includes("blackjack")) return;
    if (data.distance > 6) return;

    const obj = data.object.parent;
    this.game.commandManager.setMode(["blackjack"]);
    this.game.interactionHandler.setState(false);

    const sessionId = this.game._repo.get("blackjack_1").sessionId;

    this.game.blackjackController.join({
      object3d: obj,
      roomId: "blackjack_1", // todo from data
      playerId: sessionId,
      afterJoin: (seatPosition) => {
        this.game.player.switchCameraMode("first-person");
        this.game.player.moveTo(seatPosition);
      },
    });
  }

  registerInteractions() {
    this.game.interactionHandler.registerInteraction(
      "blackjack_table",
      "mouseOver",

      (data) => this.onMouseOver(data)
    );

    this.game.interactionHandler.registerInteraction(
      "blackjack_table",
      "mouseClick",
      (data) => this.onClick(data)
    );
  }
}

export default BlackjackInteraction;
