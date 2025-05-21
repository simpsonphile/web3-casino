import * as THREE from "three";

class MiniAxes extends THREE.AxesHelper {
  constructor(size = 1) {
    super(size);
    this.name = "miniAxes";
  }

  update() {
    this.quaternion.copy(window.camerasManager.getActiveCamera().quaternion);
  }
}

export default MiniAxes;
