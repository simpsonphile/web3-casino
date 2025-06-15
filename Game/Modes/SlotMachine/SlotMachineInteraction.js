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

    this.game.showTooltip(t("slotsMachineHover"));
  }

  getObj(obj) {
    if (obj?.userData?.name?.includes("slot.")) return obj;
    return this.getObj(obj.parent);
  }

  onClick(data) {
    if (data.distance > 6) return;

    const obj = this.getObj(data.object);
    const seatPos = new THREE.Vector3(0, 0, -1.5);
    seatPos.applyMatrix4(obj.matrixWorld);

    window.commandManager.setMode(["slotMachine"]);

    this.game.player.switchCameraMode("first-person");
    seatPos.y = 0;
    this.game.player.moveTo(seatPos);
    this.game.interactionHandler.setState(false);
    this.controller.join({ object3d: obj });
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
  }
}

export default SlotMachineInteraction;
