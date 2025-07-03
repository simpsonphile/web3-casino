import PlayableCharacterAnimation from "./PlayableCharacterAnimation";
import PlayableCharacterMovement from "./PlayableCharacterMovement";
import * as THREE from "three";

class PlayableCharacter {
  constructor({
    model,
    camera,
    onRotation,
    onAnimation,
    onBeforeMovement,
    onAfterMovement,
  }) {
    this.model = model;
    this.model.traverse((child) => child.layers.set(1));
    this._animation = new PlayableCharacterAnimation({
      model,
      onAnimation,
    });

    this._movement = new PlayableCharacterMovement({
      model,
      camera,
      onBeforeMovement,
      onAfterMovement,
      onRotation: (rotation) =>
        onRotation({
          x: rotation.x,
          y: rotation.y,
          z: rotation.z,
        }),
      onBeforeMovementAnimation: this._animation.runGoAnimation.bind(
        this._animation
      ),
      animationManager: this._animation,
    });

    this._camera = camera;
  }

  switchCameraMode(mode) {
    this._camera.switchMode(mode);
  }

  update(delta) {
    this._movement.update(delta);
    this._animation.update(delta);
  }

  setRun() {
    this._animation.setRun();
  }

  setWalk() {
    this._animation.setWalk();
  }

  goForward() {
    this._movement.goForward();
  }

  goBackward() {
    this._movement.goBackward();
  }

  goRight() {
    this._movement.goRight();
  }

  goLeft() {
    this._movement.goLeft();
  }

  moveBy(vec) {
    this._movement.moveBy(vec);
  }

  moveTo(vec) {
    this._movement.moveTo(vec);
  }

  updateMovementState({ up, down, left, right }) {
    const dir = new THREE.Vector3();

    if (up) dir.add(this._movement.getForwardVector());
    if (down) dir.add(this._movement.getBackwardVector());
    if (left) dir.add(this._movement.getLeftVector());
    if (right) dir.add(this._movement.getRightVector());

    if (dir.lengthSq() > 0) {
      this.moveInDirection(dir.normalize());
    } else {
      this.beIdle();
    }
  }

  moveInDirection(dir) {
    this._animation.runGoAnimation();
    this._movement.rotate(dir);
    this._movement.moveBy(
      dir.clone().normalize().multiplyScalar(this._movement.getSpeed())
    );
  }

  beIdle() {
    this._animation.beIdle();
  }

  rotateBy(x, y) {
    this._movement.rotateBy(x, y);
  }

  lookAt(vec) {
    this.model.lookAt(vec);
    this._camera.lookAt(vec);
  }
}

export default PlayableCharacter;
