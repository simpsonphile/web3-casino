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

  onClick(data) {
    if (data.distance > 5) return;

    const obj = data.object.parent;
    this.game.commandManager.setMode(["slotMachine"]);

    this.game.player.switchCameraMode("first-person");
    const newPosition = new THREE.Vector3()
      .copy(obj.position)
      .add(new THREE.Vector3(0, 0, -1.5));
    newPosition.y = 0;
    this.game.player.moveTo(newPosition);
    console.log(this.game.player.model.position);
    this.game.interactionHandler.setState(false);
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
