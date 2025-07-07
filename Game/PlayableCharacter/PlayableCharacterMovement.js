import * as THREE from "three";

class PlayableCharacterMovement {
  constructor({
    model,
    camera,
    onBeforeMovement,
    onAfterMovement,
    onBeforeMovementAnimation,
    onRotation,
    animationManager,
  }) {
    this.model = model;
    this._camera = camera;
    this._onBeforeMovement = onBeforeMovement;
    this._onAfterMovement = onAfterMovement;
    this._onBeforeMovementAnimation = onBeforeMovementAnimation;
    this._onRotation = onRotation;

    this._isDropping = false;

    this.targetRotation = this.model.rotation.y;
    this.currentRotation = this.model.rotation.y;
    this.rotationSpeed = 5;
    this._animationManager = animationManager;
  }

  update(delta) {
    this.updateDrop(delta);
    this.updateRotation(delta);
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
    return left;
  }

  getLeftVector() {
    const forward = this.getForwardVector();
    const right = new THREE.Vector3(forward.z, 0, -forward.x);
    return right;
  }

  // --- High-Level Movement Commands ---
  go(direction) {
    this._onBeforeMovementAnimation();
    this.rotate(direction);
    this.moveBy(direction.multiplyScalar(this.getSpeed()));
  }

  goForward() {
    this.go(this.getForwardVector());
  }

  goBackward() {
    this.go(this.getBackwardVector());
  }

  goLeft() {
    this.go(this.getLeftVector());
  }

  goRight() {
    this.go(this.getRightVector());
  }

  getSpeed() {
    return this._animationManager.isRunning ? 0.075 : 0.025;
  }

  moveBy(vec) {
    const beforeMovementData = this._onBeforeMovement(this, vec);

    if (beforeMovementData.isDropping && !this._isDropping) {
      this._isDropping = true;
      this.targetPosition = new THREE.Vector3()
        .copy(this.model.position)
        .add(beforeMovementData.vec);
    }

    if (
      !beforeMovementData.canMove ||
      beforeMovementData.isDropping ||
      this._isDropping
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

  updateDrop(delta) {
    // todo maybe move logic to some helper as it can be reused
    if (!this._isDropping) return;

    const gravity = -9.8;

    this.velocity = (this.velocity || 0) + gravity * delta;

    const newPosY = this.model.position.y + this.velocity * delta;

    if (newPosY <= this.targetPosition.y) {
      this.model.position.y = this.targetPosition.y;
      this.velocity = 0;
      this._isDropping = false;
    } else {
      this.model.position.y = newPosY;
    }
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
    this._onRotation(this.model.rotation);
  }

  rotate(aDir) {
    const dir = aDir.clone().multiplyScalar(10000);
    dir.y = 2;

    this.targetRotation = Math.atan2(dir.x, dir.z);
    this._onRotation(this.model.rotation);
  }
}

export default PlayableCharacterMovement;
