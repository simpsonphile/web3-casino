import SlotMachineView from "./SlotMachineView";

class SlotMachineController {
  constructor() {
    this.slotsStore = window.slotsStore.getState();
  }

  getSlotStoreState() {
    return window.slotsStore.getState();
  }

  _onReelStart() {
    window.soundPlayer.playSound("reelStart");
  }
  _onReelStop() {
    window.soundPlayer.playSound("reelStop");
  }
  _onSpinStop() {
    if (this.isAutoSpinToggled) {
      this.spinRand();
    }
  }

  join({ object3d }) {
    this.view = new SlotMachineView({
      object3d,
      onReelStart: this._onReelStart.bind(this),
      onReelStop: this._onReelStop.bind(this),
      onSpinStop: this._onSpinStop.bind(this),
    });

    this.slotsStore.setVisible(true);
  }

  spinOnce() {
    this.view.spinClick();
    this.spinRand();
  }

  spin(combination) {
    this.view.spin(combination);
  }

  spinRand() {
    const getRandomBetween = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const slots = [
      getRandomBetween(0, 14),
      getRandomBetween(0, 14),
      getRandomBetween(0, 14),
      getRandomBetween(0, 14),
      getRandomBetween(0, 14),
    ];

    this.spin(slots.join(","));
  }

  toggleAutoSpin() {
    this.isAutoSpinToggled = !this.isAutoSpinToggled;

    this.view.autoSpinClick(this.isAutoSpinToggled);

    if (this.isAutoSpinToggled) {
      this.spinRand();
    }
  }

  leave() {
    this.slotsStore.setVisible(false);
    this.isAutoSpinToggled = false;
  }

  showHelp() {
    this.slotsStore.setStep("help");
  }

  increaseBet() {
    this.slotsStore.increaseBet();
    this.view.raiseClick();
  }

  decreaseBet() {
    if (this.getSlotStoreState().bet > 0) {
      this.slotsStore.decreaseBet();
    }
    this.view.decreaseClick();
  }

  goBack() {
    this.slotsStore.setStep("main");
  }
}

export default SlotMachineController;
