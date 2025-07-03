import PlayableCharacterAnimation from "./PlayableCharacterAnimation";
import PlayableCharacterMovement from "./PlayableCharacterMovement";

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
    this.model.traverse((child) => child.layers.set(2));
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
      onBeforeMovmentIDK: this._animation.runGoAnimation.bind(this._animation),
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
