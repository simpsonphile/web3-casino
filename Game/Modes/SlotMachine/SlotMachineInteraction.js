import * as THREE from "three";

class SlotMachineInteraction {
  constructor({ game, controller }) {
    this.game = game;
    this.controller = controller;
    this.registerInteractions();
  }

  onMouseOver(data) {
    if (data.distance > 6) return;
    if (!window.commandManager.checkIfModeEnabled("movement")) return;

    window.showTooltip(t("slotsMachineHover"));
  }

  getObj(obj) {
    if (obj?.userData?.name?.includes("slot.")) return obj;
    return this.getObj(obj.parent);
  }

  onClick(data) {
    if (data.distance > 6) return;
    if (!window.commandManager.checkIfModeEnabled("movement")) return;

    const obj = this.getObj(data.object);
    const seatPos = new THREE.Vector3(0, 0, -0.5);
    seatPos.applyMatrix4(obj.matrixWorld);

    window.commandManager.setMode(["slotMachine"]);

    this.game.player.switchCameraMode("first-person");
    seatPos.y = 0;
    this.game.player.moveTo(seatPos);
    this.game.interactionHandler.setState(false);
    this.controller.join({ object3d: obj });
  }

  onMouseOverSpin() {
    if (!window.commandManager.checkIfModeEnabled("slotMachine")) return;
    window.showTooltip("click to spin");
  }

  onClickSpin() {
    if (!window.commandManager.checkIfModeEnabled("slotMachine")) return;
    this.controller.spinRand();
  }

  onMouseOverAutoSpin() {
    if (!window.commandManager.checkIfModeEnabled("slotMachine")) return;
    window.showTooltip("click to auto spin");
  }

  onClickAutoSpin() {
    if (!window.commandManager.checkIfModeEnabled("slotMachine")) return;
    this.controller.toggleAutoSpin();
  }

  onMouseOverRaise() {
    if (!window.commandManager.checkIfModeEnabled("slotMachine")) return;
    window.showTooltip("click to raise bet");
  }

  onClickRaise() {
    if (!window.commandManager.checkIfModeEnabled("slotMachine")) return;
    this.controller.increaseBet();
  }

  onMouseOverDecrease() {
    if (!window.commandManager.checkIfModeEnabled("slotMachine")) return;
    window.showTooltip("click to decrease bet");
  }

  onClickDecrease() {
    if (!window.commandManager.checkIfModeEnabled("slotMachine")) return;
    this.controller.decreaseBet();
  }

  registerInteractions() {
    this.game.interactionHandler.registerInteraction(
      "slot_machine",
      "mouseOver",
      (data) => this.onMouseOver(data)
    );
    this.game.interactionHandler.registerInteraction(
      "slot_machine",
      "mouseClick",
      (data) => this.onClick(data)
    );

    this.game.interactionHandler.registerInteraction(
      "slot_machine_spin",
      "mouseOver",
      (data) => this.onMouseOverSpin(data)
    );
    this.game.interactionHandler.registerInteraction(
      "slot_machine_spin",
      "mouseClick",
      (data) => this.onClickSpin(data)
    );

    this.game.interactionHandler.registerInteraction(
      "slot_machine_auto_spin",
      "mouseOver",
      (data) => this.onMouseOverAutoSpin(data)
    );
    this.game.interactionHandler.registerInteraction(
      "slot_machine_auto_spin",
      "mouseClick",
      (data) => this.onClickAutoSpin(data)
    );

    this.game.interactionHandler.registerInteraction(
      "slot_machine_decrease",
      "mouseOver",
      (data) => this.onMouseOverDecrease(data)
    );
    this.game.interactionHandler.registerInteraction(
      "slot_machine_decrease",
      "mouseClick",
      (data) => this.onClickDecrease(data)
    );

    this.game.interactionHandler.registerInteraction(
      "slot_machine_raise",
      "mouseOver",
      (data) => this.onMouseOverRaise(data)
    );
    this.game.interactionHandler.registerInteraction(
      "slot_machine_raise",
      "mouseClick",
      (data) => this.onClickRaise(data)
    );
  }
}

export default SlotMachineInteraction;
