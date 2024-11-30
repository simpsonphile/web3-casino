import * as THREE from "three";

class DeltaUpdater {
  constructor() {
    this.clock = new THREE.Clock();
    this.funcs = [];
  }

  add(func, isDelta = true) {
    this.funcs.push((delta, elapsedTime) =>
      func(isDelta ? delta : elapsedTime)
    );
  }

  update() {
    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();
    this.funcs.forEach((func) => func(delta, elapsedTime));
  }
}

export default DeltaUpdater;
