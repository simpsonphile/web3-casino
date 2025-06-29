import * as THREE from "three";

class PlinkoMachineInteraction {
  constructor({ game, controller }) {
    this.game = game;
    this.controller = controller;
    this.registerInteractions();
  }

  getObj(obj) {
    if (obj?.name?.includes("plinko-machine")) return obj;
    return this.getObj(obj.parent);
  }

  onMouseOver(data) {
    if (data.distance > 6) return;
    if (!window.commandManager.checkIfModeEnabled("movement")) return;

    window.showTooltip(t("plinko.hover"));
  }

  onClick(data) {
    if (data.distance > 6) return;
    if (!window.commandManager.checkIfModeEnabled("movement")) return;

    const obj = this.getObj(data.object);
    const seatPos = new THREE.Vector3(0, 0, -0.5);
    seatPos.applyMatrix4(obj.matrixWorld);

    window.commandManager.setMode(["plinkoMachine"]);

    this.game.player.switchCameraMode("first-person");
    seatPos.y = 0;
    this.game.player.moveTo(seatPos);
    this.game.interactionHandler.setState(false);
    this.controller.join({ object3d: obj });
  }
  onMouseOverPlay(data) {
    if (!window.commandManager.checkIfModeEnabled("plinkoMachine")) return;

    window.showTooltip(t("plinko.play"));
  }

  onClickPlay(data) {
    if (!window.commandManager.checkIfModeEnabled("plinkoMachine")) return;

    this.controller.dropBalls();
  }

  onMouseOverRiskHard(data) {
    if (!window.commandManager.checkIfModeEnabled("plinkoMachine")) return;

    window.showTooltip(t("plinko.riskHigh"));
  }

  onClickRiskHard() {
    if (!window.commandManager.checkIfModeEnabled("plinkoMachine")) return;

    this.controller.changeDifficulty("hard");
  }

  onMouseOverRiskMedium(data) {
    if (!window.commandManager.checkIfModeEnabled("plinkoMachine")) return;

    window.showTooltip(t("plinko.riskMedium"));
  }

  onClickRiskMedium() {
    if (!window.commandManager.checkIfModeEnabled("plinkoMachine")) return;

    this.controller.changeDifficulty("medium");
  }

  onMouseOverRiskEasy(data) {
    if (!window.commandManager.checkIfModeEnabled("plinkoMachine")) return;

    window.showTooltip(t("plinko.riskEasy"));
  }

  onClickRiskEasy() {
    if (!window.commandManager.checkIfModeEnabled("plinkoMachine")) return;

    this.controller.changeDifficulty("easy");
  }

  registerInteractions() {
    this.game.interactionHandler.registerInteraction(
      "plinko-machine",
      "mouseOver",
      (data) => this.onMouseOver(data)
    );
    this.game.interactionHandler.registerInteraction(
      "plinko-machine",
      "mouseClick",
      (data) => this.onClick(data)
    );

    this.game.interactionHandler.registerInteraction(
      "plinko-machine-play",
      "mouseOver",
      (data) => this.onMouseOverPlay(data)
    );
    this.game.interactionHandler.registerInteraction(
      "plinko-machine-play",
      "mouseClick",
      (data) => this.onClickPlay(data)
    );

    this.game.interactionHandler.registerInteraction(
      "plinko-machine-hard",
      "mouseOver",
      (data) => this.onMouseOverRiskHard(data)
    );
    this.game.interactionHandler.registerInteraction(
      "plinko-machine-hard",
      "mouseClick",
      (data) => this.onClickRiskHard(data)
    );
    this.game.interactionHandler.registerInteraction(
      "plinko-machine-medium",
      "mouseOver",
      (data) => this.onMouseOverRiskMedium(data)
    );
    this.game.interactionHandler.registerInteraction(
      "plinko-machine-medium",
      "mouseClick",
      (data) => this.onClickRiskMedium(data)
    );
    this.game.interactionHandler.registerInteraction(
      "plinko-machine-easy",
      "mouseOver",
      (data) => this.onMouseOverRiskEasy(data)
    );
    this.game.interactionHandler.registerInteraction(
      "plinko-machine-easy",
      "mouseClick",
      (data) => this.onClickRiskEasy(data)
    );
  }
}

export default PlinkoMachineInteraction;
