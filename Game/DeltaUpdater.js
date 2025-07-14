import * as THREE from "three";

class DeltaUpdater {
  constructor() {
    this.clock = new THREE.Clock();
    this.funcs = [];
  }

  add(func, isDelta = true) {
    const wrapped = (delta, elapsedTime) => func(isDelta ? delta : elapsedTime);

    wrapped._original = func;

    this.funcs.push(wrapped);
  }

  remove(func) {
    this.funcs = this.funcs.filter((wrapped) => wrapped._original !== func);
  }

  update() {
    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();
    this.funcs.forEach((func) => func(delta, elapsedTime));
  }
}

export default DeltaUpdater;
