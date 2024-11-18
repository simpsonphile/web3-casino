import * as THREE from "three";

class Actor extends THREE.Object3D {
  constructor({ model, animations }) {
    super();
    this.add(model);
    this.castShadow = true;
    this.mixer = new THREE.AnimationMixer(this);
    this._initAnimations(animations);
  }

  _initAnimations(animations) {
    this.animationActions = {};
    this.activeAnimation = "Idle";
    animations.forEach((animation) => {
      const name = animation.name.split("|")[1];
      this.animationActions[name] = this.mixer.clipAction(animation);
      this[`run${name}Animation`] = () => this.runAnimation(name);
    });
  }

  runAnimation(animationName) {
    if (
      this.activeAnimation === animationName ||
      !this.animationActions[animationName]
    )
      return;
    this.animationActions[this.activeAnimation].fadeOut(0.5);
    const action = this.animationActions[animationName];
    action.reset();
    action.fadeIn(0.5);
    action.play();
    this.activeAnimation = animationName;
  }

  updateMixer(delta) {
    if (this.mixer) {
      this.mixer.update(delta);
    }
  }
}

export default Actor;
