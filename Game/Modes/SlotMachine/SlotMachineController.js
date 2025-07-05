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
    if (this.hasWon) {
      window.soundPlayer.playSound("slotWin");
    }
    if (this.isAutoSpinToggled) {
      setTimeout(
        () => {
          if (this.isAutoSpinToggled) {
            this.spin();
          }
        },
        this.hasWon ? 2000 : 0
      );
    }
  }

  getRemote() {
    return window.repo.get("slots");
  }

  join({ object3d, roomId }) {
    this.view = new SlotMachineView({
      object3d,
      onReelStart: this._onReelStart.bind(this),
      onReelStop: this._onReelStop.bind(this),
      onSpinStop: this._onSpinStop.bind(this),
    });

    this.getRemote().connect({
      id: roomId,
      onJoin: () => {},
      onRoomFull: () => {},
      onNotEnoughFounds: () => console.log("not enough founds"),
      onSpinResult: this.onSpinResult.bind(this),
    });

    this.slotsStore.setVisible(true);
  }

  spinOnce() {
    this.view.spinClick();
    this.spin();
  }

  spin() {
    if (!this.view.isSpinning()) {
      this.getRemote().spin(this.getSlotStoreState().bet);
    }
  }

  onSpinResult({ combo, payout }) {
    this.view.spin(combo);

    this.hasWon = payout > 0;
  }

  toggleAutoSpin() {
    this.isAutoSpinToggled = !this.isAutoSpinToggled;

    this.view.autoSpinClick(this.isAutoSpinToggled);

    if (this.isAutoSpinToggled) {
      this.spin();
    }
  }

  leave() {
    this.getRemote().disconnect();
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
