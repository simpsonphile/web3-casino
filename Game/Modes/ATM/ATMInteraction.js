import * as THREE from "three";

class ATMInteraction {
  constructor(game) {
    this.game = game;
    this.registerInteractions();
    this.atmStore = window.atmStore.getState();
    this.userStore = window.userStore.getState();
  }

  isAllowed() {
    return !this.userStore.asGuest;
  }

  onMouseOver(data) {
    if (data.distance > 5) return;
    if (!window.commandManager.checkIfModeEnabled("movement")) return;

    window.showTooltip(
      this.isAllowed() ? t("casinoKioskHover") : t("casinoKioskHoverGuest")
    );
  }

  onClick(data) {
    if (data.distance > 5 || !this.isAllowed()) return;

    const obj = data.object.parent;

    this.game.player.switchCameraMode("first-person");
    const newPosition = new THREE.Vector3()
      .copy(obj.position)
      .add(new THREE.Vector3(-1.5, 0, 0));
    newPosition.y = 0;
    this.game.player.moveTo(newPosition);

    window.commandManager.setMode(["atm"]);
    this.game.interactionHandler.setState(false);
    this.atmStore.setIsVisible(true);
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
