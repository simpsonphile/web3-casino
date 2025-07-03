import * as THREE from "three";

class PlayableCharacter {
  // todo refacor
  constructor({
    model,
    camera,
    onBeforeMovement,
    onAfterMovement,
    onRotation,
    onAnimation,
  }) {
    this.model = model;
    this.model.traverse((child) => child.layers.set(1));

    this._isRunning = false;
    this._camera = camera;
    this._onBeforeMovement = onBeforeMovement;
    this._onAfterMovement = onAfterMovement;
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
  }

  update(delta) {
    this.updateDrop(delta);
    this.updateRotation(delta);

    this.model.updateMixer(delta);
  }

  updateRotation(delta) {
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
  }

  updateDrop(delta) {
    // todo maybe move logic to some helper as it can be reused
    if (!this.isDropping) return;

    const gravity = -9.8;

    this.velocity = (this.velocity || 0) + gravity * delta;

    const newPosY = this.model.position.y + this.velocity * delta;

    if (newPosY <= this.targetPosition.y) {
      this.model.position.y = this.targetPosition.y;
      this.velocity = 0;
      this.isDropping = false;
    } else {
      this.model.position.y = newPosY;
    }
  }

  rotateBy(x, y) {
    // first update camera rotation
    this._camera.updateCameraRotation(x, y);

    this._onRotation(this.model.rotation);
  }

  setRun() {
    this._isRunning = true;
    this._camera.setSprinting(true);
  }

  setWalk() {
    this._isRunning = false;
    this._camera.setSprinting(false);
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
  }

  goBackward() {
    this.runGoAnimation();
    this.moveBy(this.getBackwardVector().multiplyScalar(this.getSpeed()));
    this.rotateBackward();
  }

  goLeft() {
    this.runGoAnimation();
    this.moveBy(this.getLeftVector().multiplyScalar(this.getSpeed()));
    this.rotateLeft();
  }

  goRight() {
    this.runGoAnimation();
    this.moveBy(this.getRightVector().multiplyScalar(this.getSpeed()));
    this.rotateRight();
  }

  moveBy(vec) {
    const beforeMovementData = this._onBeforeMovement(this, vec);

    if (beforeMovementData.isDropping && !this.isDropping) {
      this.isDropping = true;
      this.targetPosition = new THREE.Vector3()
        .copy(this.model.position)
        .add(beforeMovementData.vec);
    }

    if (
      !beforeMovementData.canMove ||
      beforeMovementData.isDropping ||
      this.isDropping
    )
      return;

    const newVec = beforeMovementData.vec || vec;
    this.model.position.add(newVec);
    this._onAfterMovement(this.model.position);
  }

  moveTo(vec) {
    this.model.position.copy(vec);
    this._onAfterMovement(this.model.position);
  }

  beIdle() {
    this.model.runIdleAnimation();
    this._onAnimation("Idle");
  }
}

export default PlayableCharacter;
