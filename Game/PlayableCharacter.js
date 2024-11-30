import * as THREE from "three";

class PlayableCharacter {
  constructor({ model, camera, onMovement, onRotation, onAnimation }) {
    this.model = model;
    this._isRunning = false;
    this._camera = camera;
    this._onMovement = onMovement;
    this._onRotation = (rotation) =>
      onRotation({
        x: rotation.x,
        y: rotation.y,
        z: rotation.z,
      });
    this._onAnimation = onAnimation;

    this.targetRotation = this.model.rotation.y;
    this.currentRotation = this.model.rotation.y;
    this.rotationSpeed = 5;
  }

  switchCameraMode(mode) {
    this._camera.switchMode(mode);
    this._camera.positionCamera();
  }

  update(delta) {
    const rotationDelta = this.targetRotation - this.currentRotation;
    if (Math.abs(rotationDelta) >= Math.PI) {
      const sign = rotationDelta > 0 ? 1 : -1;
      this.currentRotation += sign * 2 * Math.PI;
    }

    this.currentRotation = THREE.MathUtils.lerp(
      this.currentRotation,
      this.targetRotation,
      Math.min(1, this.rotationSpeed * delta)
    );
    this.model.rotation.y = this.currentRotation;

    this.model.updateMixer(delta);
  }

  rotateBy(x, y) {
    // first update camera rotation
    this._camera.updateCameraRotation(x, y);

    // get camera direction
    const dir = new THREE.Vector3();
    this._camera.getWorldDirection(dir);
    dir.multiplyScalar(10000);
    // make sure its always on the same height
    dir.y = 2;
    this.targetRotation = Math.atan2(dir.x, dir.z);
    this._camera.positionCamera();
    this._onRotation(this.model.rotation);
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

    // this.model.lookAt(dir);
    this.targetRotation = Math.atan2(dir.x, dir.z);
    this._onRotation(this.model.rotation);
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
    this._camera.getWorldDirection(dir);
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
      this.model.runRunAnimation();
      this._onAnimation("Run");
    } else {
      this.model.runWalkAnimation();
      this._onAnimation("Walk");
    }
  }

  getSpeed() {
    return this._isRunning ? 0.075 : 0.025;
  }

  goForward() {
    this.runGoAnimation();

    this.moveBy(this.getForwardVector().multiplyScalar(this.getSpeed()));
    this.rotateForward();
    this._camera.positionCamera();
  }

  goBackward() {
    this.runGoAnimation();
    this.moveBy(this.getBackwardVector().multiplyScalar(this.getSpeed()));
    this.rotateBackward();
    this._camera.positionCamera();
  }

  goLeft() {
    this.runGoAnimation();
    this.moveBy(this.getLeftVector().multiplyScalar(this.getSpeed()));
    this.rotateLeft();
    this._camera.positionCamera();
  }

  goRight() {
    this.runGoAnimation();
    this.moveBy(this.getRightVector().multiplyScalar(this.getSpeed()));
    this.rotateRight();
    this._camera.positionCamera();
  }

  moveBy(vec) {
    this.model.position.add(vec);
    this._onMovement(this.model.position);
    this._camera.positionCamera();
  }

  moveTo(vec) {
    this.model.position.copy(vec);
    this._onMovement(this.model.position);
    this._camera.positionCamera();
  }

  beIdle() {
    this.model.runIdleAnimation();
    this._onAnimation("Idle");
  }
}

export default PlayableCharacter;
