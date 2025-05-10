import SlotMachineView from "./SlotMachineView";

const reelStartSound = new Audio("game-assets/sounds/reel-start.mp3");
const reelStopSound = new Audio("game-assets/sounds/reel-stop.mp3");

const playSound = (sound) => {
  sound.currentTime = 0;
  sound.play();
};

class SlotMachineController {
  constructor() {}

  _onReelStart() {
    playSound(reelStartSound);
  }
  _onReelStop() {
    playSound(reelStopSound);
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
