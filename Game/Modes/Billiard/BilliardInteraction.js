class BilliardInteraction {
  constructor({ game, controller }) {
    this.game = game;
    this.controller = controller;
    this.registerInteractions();
  }

  getObj(obj) {
    if (obj?.userData?.name?.includes("table")) return obj.parent;
    return this.getObj(obj.parent);
  }

  onMouseOver(data) {
    if (data.distance > 6) return;
    if (
      window.commandManager.checkIfModeEnabled("menu") ||
      window.commandManager.checkIfModeEnabled("billiard")
    )
      return;

    window.showTooltip(t("billiard.hover"));
  }

  async onClick(data) {
    if (window.commandManager.checkIfModeEnabled("billiard")) {
      this.controller.onTableClick(data);
      return;
    }

    if (data.distance > 6) return;

    const obj = this.getObj(data.object);

    // const roomId = obj.parent.userData.billiard_table_id;

    // const sessionId = window.repo.get("blackjack").sessionId;

    const success = await this.controller.join({
      objectName: obj.name,
      //   roomId: roomId,
      //   playerId: sessionId,
      afterJoin: (seatPosition) => {
        this.game.player.switchCameraMode("first-person");
        this.game.player.moveTo(seatPosition);
      },
    });

    if (!success) return;

    window.commandManager.setMode(["movement", "billiard"]);
    this.game.interactionHandler.setState(false);
  }

  onBallClick(data) {
    if (data.distance > 1.5) return;
    this.controller.charge(data);
  }

  onBallHover(data) {
    if (data.distance > 1.5) return;
    if (!window.commandManager.checkIfModeEnabled("billiard")) return;

    this.controller.onBallHover(data.object, data.point);
  }

  onBallMouseLeave() {
    this.controller.stopAiming();
  }

  onBallMouseDown(data) {
    console.log("onBallMouseDown", data);
  }

  registerInteractions() {
    this.game.interactionHandler.registerInteraction(
      "billiard_table",
      "mouseOver",

      (data) => this.onMouseOver(data)
    );

    this.game.interactionHandler.registerInteraction(
      "billiard_table",
      "mouseClick",
      (data) => this.onClick(data)
    );

    this.game.interactionHandler.registerInteraction(
      "billiard_table_ball",
      "mouseDown",
      (data) => this.onBallClick(data)
    );

    this.game.interactionHandler.registerInteraction(
      "billiard_table_ball",
      "mouseLeave",
      () => this.onBallMouseLeave()
    );

    this.game.interactionHandler.registerInteraction(
      "billiard_table_ball",
      "mouseOver",
      (data) => this.onBallHover(data)
    );
  }
}

export default BilliardInteraction;
