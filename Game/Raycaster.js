import * as THREE from "three";

class Raycaster {
  constructor() {
    this.pointer = new THREE.Vector2(0, 0);
    this.raycaster = new THREE.Raycaster();
    this.raycaster.layers.set(0);
  }

  getInstancedObjectPosition(intersect) {
    const instanceId = intersect.instanceId;

    const instanceMatrix = new THREE.Matrix4();

    intersect.object.getMatrixAt(instanceId, instanceMatrix);

    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    instanceMatrix.decompose(position, quaternion, scale);

    return position;
  }

  getIntersectsFromRaycaster() {
    this.raycaster.setFromCamera(
      this.pointer,
      window.camerasManager.getActiveCamera()
    );
    const intersects = this.raycaster.intersectObjects(window.scene.children);
    return intersects;
  }

  getIntersectToCameraUnitVector(intersectPos, intersectPoint) {
    const offset = new THREE.Vector3();
    offset.subVectors(intersectPoint, intersectPos);

    // Find which axis has the largest offset to determine the face that was clicked
    const absOffset = new THREE.Vector3(
      Math.abs(offset.x),
      Math.abs(offset.y),
      Math.abs(offset.z)
    );

    // The direction vector that will indicate where to place the new block
    const direction = new THREE.Vector3();

    // Compare which axis has the largest offset to determine the face clicked
    if (absOffset.x > absOffset.y && absOffset.x > absOffset.z) {
      // X-axis is the largest, so the click was on the left or right face
      direction.set(Math.sign(offset.x), 0, 0);
    } else if (absOffset.y > absOffset.x && absOffset.y > absOffset.z) {
      // Y-axis is the largest, so the click was on the top or bottom face
      direction.set(0, Math.sign(offset.y), 0);
    } else {
      // Z-axis is the largest, so the click was on the front or back face
      direction.set(0, 0, Math.sign(offset.z));
    }

    return direction;
  }
}

export default Raycaster;
