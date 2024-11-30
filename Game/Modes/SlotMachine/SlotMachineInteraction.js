import * as THREE from "three";

class SlotMachineInteraction {
  constructor(game) {
    this.game = game;
    this.registerInteractions();
  }

  onMouseOver(data) {
    if (data.distance > 6) return;
    if (!this.game.commandManager.checkIfModeEnabled("movement")) return;

    this.game.showTooltip("wanna play slots?");
  }

  getObj(obj) {
    if (obj?.userData?.name?.includes("slot.")) return obj;
    return this.getObj(obj.parent);
  }

  onClick(data) {
    if (data.distance > 6) return;

    const obj = this.getObj(data.object);
    const seatPos = obj.userData.seat.map((a) => a * 1.5);

    this.game.commandManager.setMode(["slotMachine"]);

    this.game.player.switchCameraMode("first-person");
    const newPosition = new THREE.Vector3()
      .copy(obj.position)
      .add(new THREE.Vector3(...seatPos));
    newPosition.y = 0;
    this.game.player.moveTo(newPosition);
    this.game.interactionHandler.setState(false);
    this.game.slotMachineController.join({ object3d: obj });
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
