import * as THREE from "three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";

class BusinessMan {
  constructor() {
    this.model = SkeletonUtils.clone(window.models.business_man.scene);
    this.animations = window.models.business_man.animations; //not working for clones
    this.animationActions = {};
    this.activeAnimation = "Idle";

    this.model.rotation.y = Math.PI;
    this.model.castShadow = true;
    this.mixer = new THREE.AnimationMixer(this.model);

    this.animations.forEach((animation) => {
      this.animationActions[animation.name.split("|")[1]] =
        this.mixer.clipAction(animation);
    });

    this.idleAnimation();

    window.scene.add(this.model);
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

  idleAnimation() {
    this.runAnimation("Idle");
  }

  walkAnimation() {
    this.runAnimation("Walk");
  }

  runningAnimation() {
    this.runAnimation("Run");
  }

  updateMixer(delta) {
    if (this.mixer) {
      this.mixer.update(delta);
    }
  }

  setPosition(position) {
    this.model.position.set(position.x, position.y, position.z);
  }

  updatePositionByVector(vec) {
    this.model.position.add(vec);
  }
}

export default BusinessMan;
