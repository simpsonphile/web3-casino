class PlayableCharacterAnimation {
  constructor({ model, onAnimation }) {
    this._onAnimation = onAnimation;
    this.model = model;
    this.isRunning = false;
  }

  update(delta) {
    this.model.updateMixer(delta);
  }

  setRun() {
    this.isRunning = true;
  }
  setWalk() {
    this.isRunning = false;
  }

  runGoAnimation() {
    if (this.isRunning) {
      this.model.runRunAnimation();
      this._onAnimation("Run");
    } else {
      this.model.runWalkAnimation();
      this._onAnimation("Walk");
    }
  }

  beIdle() {
    this.model.runIdleAnimation();
    this._onAnimation("Idle");
  }
}

export default PlayableCharacterAnimation;
