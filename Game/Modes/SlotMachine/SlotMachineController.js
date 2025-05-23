import SlotMachineView from "./SlotMachineView";

class SlotMachineController {
  constructor() {}

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
  }

  spin(combination) {
    this.view.spin(combination);
  }

  update(delta) {
    if (!this.view) return;
    this.view.update(delta);
  }
}

export default SlotMachineController;
