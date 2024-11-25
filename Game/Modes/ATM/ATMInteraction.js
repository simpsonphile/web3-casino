import * as THREE from "three";

class ATMInteraction {
  constructor(game) {
    this.game = game;
    this.registerInteractions();
  }

  onMouseOver(data) {
    const pos = new THREE.Vector3()
      .copy(data.object.position)
      .add(new THREE.Vector3(0, 3, 0));

    if (data.distance > 5) return;
    if (!this.game.commandManager.checkIfModeEnabled("movement")) return;

    this.game.showTooltip("use?");
  }

  onClick(data) {
    if (data.distance > 5) return;

    const obj = data.object;
    this.game.camerasManager.getCamera("zoom").setTarget(obj.position);
    this.game.camerasManager.setActiveCamera("zoom", true, () => {
      this.game.commandManager.setMode(["zoom", "atm"]);
      this.game.interactionHandler.setState(false);
      this.game.onAtmClick();
    });
  }

  registerInteractions() {
    this.game.interactionHandler.registerInteraction(
      "atm",
      "mouseOver",
      (data) => this.onMouseOver(data)
    );

    this.game.interactionHandler.registerInteraction(
      "atm",
      "mouseClick",
      (data) => this.onClick(data)
    );
  }
}

export default ATMInteraction;
