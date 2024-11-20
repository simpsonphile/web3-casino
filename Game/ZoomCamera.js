import * as THREE from "three";

class ZoomCamera extends THREE.PerspectiveCamera {
  constructor({ fov, aspect, near, far, targetPos }) {
    super(fov, aspect, near, far);
    this.targetPos = targetPos;
  }

  setTarget(vec) {
    this.position.set(vec.x, vec.y + 2, vec.z);
    this.targetPos = vec;
    this.lookAt(this.targetPos);
  }

  zoomBy(factor) {
    const direction = new THREE.Vector3()
      .subVectors(this.targetPos, this.position)
      .normalize();

    direction.multiplyScalar(factor);

    this.position.add(direction);
  }
}

export default ZoomCamera;
