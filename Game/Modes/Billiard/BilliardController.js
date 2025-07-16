import * as THREE from "three";
import billiardBalls from "@Game/Models/BilliardBalls";
import BilliardPhysics from "./BilliardPhysics";

class BilliardController {
  constructor({ views }) {
    this.views = views;

    this.initListeners();

    window.deltaUpdater.add(this.updateChargerBar.bind(this));

    this.uiStore = window.billiardStore.getState();
  }

  onTableClick(data) {
    const { step, setStep, isPhysicsRunning } = this.getCurrentUiState();

    if (step === "cuePlacement" && !isPhysicsRunning) {
      const newBallPosition = new THREE.Vector3().copy(data.point);
      newBallPosition.y = this.currentView.getGroundY();

      this.whiteBall.physicsBody.position.set(
        newBallPosition.x,
        newBallPosition.y,
        newBallPosition.z
      );
      this.whiteBall.position.set(
        newBallPosition.x,
        newBallPosition.y,
        newBallPosition.z
      );
      this.whiteBall.physicsBody.isInHole = false;
      setStep("yourTurn");
    }
  }

  getCurrentUiState() {
    return window.billiardStore.getState();
  }

  initListeners() {
    document.addEventListener("mousedown", () => {
      this.isHolding = true;
      this.holdStartTime = performance.now();
    });

    document.addEventListener("mouseup", () => {
      this.isHolding = false;

      if (this.isCharging) this.hit();
    });
  }

  updateChargerBar() {
    if (!this.holdStartTime || !this.isHolding || !this.isCharging) return;

    const elapsed = performance.now() - this.holdStartTime;
    const speed = 0.001;
    const strength = 0.5 * (1 - Math.cos(elapsed * speed * Math.PI));

    this.uiStore.setStrength(strength);
  }

  checkIfCanCharge() {
    const { step, isPhysicsRunning } = this.getCurrentUiState();
    return step === "yourTurn" && !isPhysicsRunning;
  }

  charge(data) {
    if (!this.checkIfCanCharge()) return;

    let ball;
    data.object.traverseUp((child) => {
      if (child?.name.includes("white")) {
        ball = child;
        this.isCharging = true;
      }
    });

    if (!ball) return;

    this.chargePoint = data.point;
    this.chargeBall = ball;
  }

  aim(ball, point) {
    const startPoint = new THREE.Vector3();
    ball.getWorldPosition(startPoint);
    startPoint.y = this.currentView.getGroundY();
    const unitVector = new THREE.Vector3()
      .subVectors(startPoint, point)
      .normalize();

    const endPoint = new THREE.Vector3()
      .copy(startPoint)
      .add(unitVector.multiplyScalar(2)); // Extend the line length

    endPoint.y = startPoint.y;

    this.currentView.updateAimingLine(startPoint, endPoint);
  }

  onBallHover(ball, point) {
    if (!this.checkIfCanCharge()) return;

    ball.traverseUp((child) => {
      if (child.name.includes("white")) {
        this.aim(ball, point);
        return;
      }
    });
  }

  stopAiming() {
    this.currentView.stopAimingLine();
  }

  hit() {
    const { strength, setStrength, setPhysicsRunning } =
      this.getCurrentUiState();

    this.physics.hitBall(this.chargeBall, this.chargePoint, strength * 2);
    this.chargeBall = null;
    this.isCharging = false;
    setStrength(0);
    setPhysicsRunning(true);
  }

  initPhysicBodies() {
    this.currentView.object3d.traverse((child) => {
      if (child.name.includes("physics")) {
        child.traverse((subChild) => {
          if (subChild.type === "Mesh") {
            if (subChild.name.includes("bumper")) {
              this.physics.addBumperShape(subChild);
            } else if (subChild.name.includes("ground")) {
              this.physics.addGroundShape(subChild);
            }
            subChild.visible = false;
          }
        });
      }
    });
  }

  onNoMotion() {
    this.uiStore.setPhysicsRunning(false);
  }

  removeBall(ball) {
    this.currentView.removeBall(ball);
    this.physics.removeBall(ball);
  }

  onBallInTheHole(ball) {
    if (ball === this.whiteBall) {
      this.uiStore.setStep("cuePlacement");
      return;
    }

    if (ball.name.includes("black")) {
      this.removeBall(ball); // change to win or lose
      return;
    }

    if (ball.name.includes("solid")) {
      console.log("solid in the hole");
    } else {
      console.log("stripe in the hole");
    }

    this.removeBall(ball);
    return;
  }

  async join({ objectName, afterJoin }) {
    this.currentView = this.views[objectName];
    this.currentView.init();
    this.physics = new BilliardPhysics({
      onBallInTheHole: this.onBallInTheHole.bind(this),
      // onBallToBallCollision: console.log,
      onNoMotion: this.onNoMotion.bind(this),
    });
    this.initPhysicBodies();
    this.initBalls();

    afterJoin(
      new THREE.Vector3()
        .copy(this.whiteBall.position)
        .add(new THREE.Vector3(0, -0.7, -1))
    );

    this.uiStore.setIsVisible(true);

    return true;
  }

  exit() {
    this.currentView.clearScene();
    this.physics.disposeWorld();
    window.commandManager.popMode();
    this.uiStore.setIsVisible(false);
  }

  addInteractionsToBalls() {
    [...this.balls, this.whiteBall].forEach((ball) => {
      ball.traverse((child) => {
        if (child?.userData) {
          child.userData.interactionType = "billiard_table_ball";
        }
      });
    });
  }

  initBalls() {
    this.whiteBall = billiardBalls.solid.white();
    this.balls = [
      billiardBalls.solid.yellow(),

      billiardBalls.half.blue(),
      billiardBalls.solid.red(),

      billiardBalls.solid.purple(),
      billiardBalls.solid.black(),
      billiardBalls.half.yellow(),

      billiardBalls.solid.orange(),
      billiardBalls.half.red(),
      billiardBalls.solid.green(),
      billiardBalls.half.purple(),

      billiardBalls.solid.maroon(),
      billiardBalls.half.orange(),
      billiardBalls.solid.blue(),
      billiardBalls.half.green(),
      billiardBalls.half.maroon(),
    ];

    this.currentView.initColorBalls(this.balls);
    this.currentView.initWhiteBall(this.whiteBall);
    this.physics.addBalls(this.balls);
    this.physics.addBall(this.whiteBall);

    this.addInteractionsToBalls();
  }

  newGame() {
    if (this.getCurrentUiState().step !== "gameOver") return;

    this.currentView.clearScene();
    this.physics.disposeWorld();
    this.initBalls();
    this.initPhysicBodies();
    this.physics.initWorld();
    this.uiStore.reset();
  }
}

export default BilliardController;
