import SlotMachineView from "./SlotMachineView";

class SlotMachineController {
  constructor() {
    this.slotsStore = window.slotsStore.getState();
    this.userStore = window.userStore.getState();
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
    this.userStore.refreshBalance();
  }

  getRemote() {
    return window.repo.get("slots");
  }

  async join({ object3d, roomId }) {
    const success = await this.getRemote().connect({
      id: roomId,
      balance: window.userStore.getState().guestBalance,
      onJoin: () => {},
      onRoomFull: () => console.log("room full"),
      onNotEnoughFounds: () => console.log("not enough founds"),
      onSpinResult: this.onSpinResult.bind(this),
    });

    if (!success) {
      return false;
    }

    this.view = new SlotMachineView({
      object3d,
      onReelStart: this._onReelStart.bind(this),
      onReelStop: this._onReelStop.bind(this),
      onSpinStop: this._onSpinStop.bind(this),
    });

    this.slotsStore.setVisible(true);
    return true;
  }

  spinOnce() {
    this.view.spinClick();
    this.spin();
  }

  spin() {
    if (!this.view.isSpinning()) {
      const bet = this.getSlotStoreState().bet;
      this.getRemote().spin(bet);
      this.userStore.addToGuestBalance(-bet);
    }
  }

  onSpinResult({ combo, payout }) {
    this.view.spin(combo);

    this.hasWon = payout > 0;
    this.userStore.addToGuestBalance(payout);
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
