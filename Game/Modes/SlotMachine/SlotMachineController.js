import SlotMachineView from "./SlotMachineView";

class SlotMachineController {
  constructor() {
    this.slotsStore = window.slotsStore.getState();
  }

  _onReelStart() {
    window.soundPlayer.playSound("reelStart");
  }
  _onReelStop() {
    window.soundPlayer.playSound("reelStop");
  }
  _onSpinStop() {}

  join({ object3d }) {
    this.view = new SlotMachineView({
      object3d,
      onReelStart: this._onReelStart,
      onReelStop: this._onReelStop,
      onSpinStop: this._onSpinStop,
    });

    this.slotsStore.setVisible(true);
  }

  spin(combination) {
    this.view.spin(combination);
  }

  update(delta) {
    if (!this.view) return;
    this.view.update(delta);
  }

  leave() {
    this.slotsStore.setVisible(false);
  }

  showHelp() {
    this.slotsStore.setStep("help");
  }
  increaseBet() {
    this.slotsStore.increaseBet();
  }
  decreaseBet() {
    if (this.slotsStore.bet > 0) {
      this.slotsStore.decreaseBet();
    }
  }
  goBack() {
    this.slotsStore.setStep("main");
  }
}

export default SlotMachineController;
