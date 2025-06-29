import PlinkoMachineView from "./PlinkoMachineView";

class PlinkoMachineController {
  constructor() {
    this.plinkoStore = window.plinkoStore.getState();
  }

  join({ object3d }) {
    this.object3d = object3d;

    this.view = new PlinkoMachineView();
    this.view.initScreen(this.object3d);
  }

  increaseBet() {
    this.plinkoStore.increaseBet();
    this.view.increaseBetClick();
  }

  decreaseBet() {
    this.plinkoStore.decreaseBet();
    this.view.decreaseBetClick();
  }

  increaseBalls() {
    this.plinkoStore.increaseBalls();
    this.view.increaseBallsClick();
  }

  decreaseBalls() {
    this.plinkoStore.decreaseBalls();
    this.view.decreaseBallsClick();
  }

  changeDifficulty(diff) {
    this.plinkoStore.changeDifficulty(diff);
    this.view.changeDifficultyClick();
  }

  leave() {
    this.view.stop();
  }

  dropBalls(count) {
    this.view?.dropBalls({
      multiplier: 11,
      difficulty: "easy",
      payout: 100,
      bet: 10,
    });
  }
}

export default PlinkoMachineController;
