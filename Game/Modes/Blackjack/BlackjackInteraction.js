class BlackjackInteraction {
  constructor({ game, controller }) {
    this.game = game;
    this.controller = controller;
    this.registerInteractions();
  }

  onMouseOver(data) {
    if (data.distance > 6) return;
    if (!this.game.commandManager.checkIfModeEnabled("movement")) return;

    this.game.showTooltip("wanna join blackjack game?");
  }

  getObj(obj) {
    if (obj?.userData?.name?.includes("blackjack_table")) return obj;
    return this.getObj(obj.parent);
  }

  onClick(data) {
    if (this.game.commandManager.getMode().includes("blackjack")) return;
    if (data.distance > 6) return;

    const obj = this.getObj(data.object);
    const roomId = obj.userData.blackjack_table_id;
    this.game.commandManager.setMode(["blackjack"]);
    this.game.interactionHandler.setState(false);

    const sessionId = window.repo.get("blackjack").sessionId;
    this.controller.join({
      objectName: obj.name,
      roomId: roomId,
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
