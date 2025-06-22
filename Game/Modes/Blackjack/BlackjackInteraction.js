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

    const obj = this.getObj(data.object);
    const canJoin = this.controller.canJoinTable(obj.name);

    this.game.showTooltip(
      canJoin ? t("blackjackTableHover") : t("blackjackTableHoverFull")
    );
  }

  onClick(data) {
    if (window.commandManager.checkIfModeEnabled("blackjack")) return;
    if (data.distance > 6) return;

    const obj = this.getObj(data.object);
    const canJoin = this.controller.canJoinTable(obj.name);

    if (!canJoin) return;

    const roomId = obj.userData.blackjack_table_id;
    window.commandManager.setMode(["blackjack"]);
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
