import * as THREE from "three";

class PlayableCharacter {
  constructor({
    model,
    thirdPersonCamera,
    onMovement,
    onRotation,
    onAnimation,
  }) {
    this.model = model;
    this._isRunning = false;
    this._thirdPersonCamera = thirdPersonCamera;
    this._onMovement = onMovement;
    this._onRotation = (rotation) =>
      onRotation({
        x: rotation.x,
        y: rotation.y,
        z: rotation.z,
      });
    this._onAnimation = onAnimation;
  }

  rotateBy(x, y) {
    // first update camera rotation
    this._thirdPersonCamera.updateCameraRotation(x, y);

    // get camera direction
    const dir = new THREE.Vector3();
    this._thirdPersonCamera.getWorldDirection(dir);
    dir.multiplyScalar(10000);
    // make sure its always on the same height
    dir.y = 2;
    this.model.model.lookAt(dir);
    // make sure camera is behind model
    this._thirdPersonCamera.positionCameraBehindPlayer();
    this._onRotation(this.model.model.rotation);
  }

  setRun() {
    this._isRunning = true;
  }
  setWalk() {
    this._isRunning = false;
  }

  rotate(dir) {
    dir.multiplyScalar(10000);
    dir.y = 2;

    this.model.model.lookAt(dir);
    this._onRotation(this.model.model.rotation);
  }

  rotateLeft() {
    this.rotate(this.getLeftVector());
  }
  rotateRight() {
    this.rotate(this.getRightVector());
  }
  rotateBackward() {
    this.rotate(this.getBackwardVector());
  }
  rotateForward() {
    this.rotate(this.getForwardVector());
  }

  getForwardVector() {
    const dir = new THREE.Vector3();
    this._thirdPersonCamera.getWorldDirection(dir);
    dir.y = 0;
    dir.normalize();
    return dir;
  }

  getBackwardVector() {
    return this.getForwardVector().multiplyScalar(-1);
  }

  getRightVector() {
    const forward = this.getForwardVector();
    const left = new THREE.Vector3(-forward.z, 0, forward.x);
    left.normalize();
    return left;
  }

  getLeftVector() {
    const forward = this.getForwardVector();
    const right = new THREE.Vector3(forward.z, 0, -forward.x);
    right.normalize();
    return right;
  }

  runGoAnimation() {
    if (this._isRunning) {
      this.model.runningAnimation();
      this._onAnimation("Run");
    } else {
      this.model.walkAnimation();
      this._onAnimation("Walk");
    }
  }

  getSpeed() {
    return this._isRunning ? 0.3 : 0.1;
  }

  goForward() {
    this.runGoAnimation();

    this.moveBy(this.getForwardVector().multiplyScalar(this.getSpeed()));
    this.rotateForward();
    this._thirdPersonCamera.positionCameraBehindPlayer();
  }

  goBackward() {
    this.runGoAnimation();
    this.moveBy(this.getBackwardVector().multiplyScalar(this.getSpeed()));
    this.rotateBackward();
    this._thirdPersonCamera.positionCameraBehindPlayer();
  }

  goLeft() {
    this.runGoAnimation();
    this.moveBy(this.getLeftVector().multiplyScalar(this.getSpeed()));
    this.rotateLeft();
    this._thirdPersonCamera.positionCameraBehindPlayer();
  }

  goRight() {
    this.runGoAnimation();
    this.moveBy(this.getRightVector().multiplyScalar(this.getSpeed()));
    this.rotateRight();
    this._thirdPersonCamera.positionCameraBehindPlayer();
  }

  moveBy(vec) {
    this.model.updatePositionByVector(vec);
    this._onMovement(this.model.model.position);
  }

  moveTo(vec) {
    this.model.setPosition(vec);
    this._onMovement(this.model.model.position);
  }

  beIdle() {
    this.model.idleAnimation();
    this._onAnimation("Idle");
  }
}

export default PlayableCharacter;
