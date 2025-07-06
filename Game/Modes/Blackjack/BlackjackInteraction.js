class BlackjackInteraction {
  constructor({ game, controller }) {
    this.game = game;
    this.controller = controller;
    this.registerInteractions();
  }

  getObj(obj) {
    if (obj?.userData?.name?.includes("blackjack_table")) return obj;
    return this.getObj(obj.parent);
  }

  onMouseOver(data) {
    if (data.distance > 6) return;
    if (!window.commandManager.checkIfModeEnabled("movement")) return;

    window.showTooltip(t("blackjackTableHover"));
  }

  async onClick(data) {
    if (window.commandManager.checkIfModeEnabled("blackjack")) return;
    if (data.distance > 6) return;

    const obj = this.getObj(data.object);

    const roomId = obj.parent.userData.blackjack_table_id;

    const sessionId = window.repo.get("blackjack").sessionId;

    const success = await this.controller.join({
      objectName: obj.name,
      roomId: roomId,
      playerId: sessionId,
      afterJoin: (seatPosition) => {
        this.game.player.switchCameraMode("first-person");
        this.game.player.moveTo(seatPosition);
      },
    });

    if (!success) return;

    window.commandManager.setMode(["blackjack"]);
    this.game.interactionHandler.setState(false);
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
