import * as THREE from "three";

class ZoomCamera extends THREE.PerspectiveCamera {
  constructor({ fov, aspect, near, far, target }) {
    super(fov, aspect, near, far);
    this.target = target;
  }

  setTarget(vec) {
    this.position.set(vec.x + 1, vec.y + 2, vec.z + 1);
    this.target = vec;
    this.lookAt(this.target);
  }

  zoomBy(factor) {
    const direction = new THREE.Vector3()
      .subVectors(this.target, this.position)
      .normalize();

    direction.multiplyScalar(factor);

    this.position.add(direction);
  }
}

export default ZoomCamera;
