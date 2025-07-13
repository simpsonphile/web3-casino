import { PlinkoGame } from "@MiniGames/plinko-game";
import PlinkoScreen from "./PlinkoMachineScreen";
import {
  animateButtonClick,
  restoreEmissionPower,
  setEmissionPower,
} from "@Game/animations";

const ELEMENT_NAMES = [
  "back",
  "screen",
  "bet_increase",
  "bet_decrease",
  "balls_increase",
  "balls_decrease",
  "play",
  "risk_easy",
  "risk_medium",
  "risk_hard",
];

class PlinkoMachineView {
  constructor() {
    this.plinkoStore = window.plinkoStore;
    this.elements = {};
  }

  getElements(object3d) {
    object3d.traverse((children) => {
      if (ELEMENT_NAMES.includes(children.userData.name)) {
        this.elements[children.userData.name] = children;
      }
    });
  }

  initScreen(object3d) {
    this.getElements(object3d);

    this.game = new PlinkoGame({
      difficulty: "easy",
      multipliers: {
        easy: [11, 3.2, 1.6, 1.2, 1.1, 1, 0.5].reverse(),
        medium: [25, 8, 3.1, 1.7, 1.2, 0.7, 0.3].reverse(),
        hard: [141, 25, 8.1, 2.3, 0.7, 0.2, 0].reverse(),
      },
      onBallFinish: (rate) => {
        window.soundPlayer.playSound("plinkoHit", rate);
      },
    });

    this.game.init();

    this.canvas = new PlinkoScreen(this.game.canvas);
    this.elements.screen.getWorldPosition(this.canvas.position);
    this.elements.screen.getWorldQuaternion(this.canvas.quaternion);
    this.canvas.translateY(-this.elements.screen.position.y / 2);
    window.cssScene.add(this.canvas);
  }

  stop() {
    this.game.stop();
    window.cssScene.remove(this.canvas);
  }

  dropBalls(a) {
    animateButtonClick(this.elements.play);
    this.game.dropFairRandomBall(a);
  }

  increaseBetClick() {
    animateButtonClick(this.elements.bet_increase);
  }

  decreaseBetClick() {
    animateButtonClick(this.elements.bet_decrease);
  }

  increaseBallsClick() {
    animateButtonClick(this.elements.balls_increase);
  }

  decreaseBallsClick() {
    animateButtonClick(this.elements.balls_decrease);
  }

  changeDifficultyClick() {
    const newDiff = this.plinkoStore.getState().difficulty;
    this.game.setDifficulty(newDiff);

    switch (newDiff) {
      case "easy": {
        animateButtonClick(this.elements.risk_easy);
        setEmissionPower(this.elements.risk_easy);
        restoreEmissionPower(this.elements.risk_medium);
        restoreEmissionPower(this.elements.risk_hard);
        break;
      }
      case "medium": {
        animateButtonClick(this.elements.risk_medium);
        setEmissionPower(this.elements.risk_medium);
        restoreEmissionPower(this.elements.risk_easy);
        restoreEmissionPower(this.elements.risk_hard);

        break;
      }
      case "hard": {
        animateButtonClick(this.elements.risk_hard);
        setEmissionPower(this.elements.risk_hard);
        restoreEmissionPower(this.elements.risk_easy);
        restoreEmissionPower(this.elements.risk_medium);
        break;
      }
    }
  }
}

export default PlinkoMachineView;
