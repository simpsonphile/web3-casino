import * as THREE from "three";

THREE.Object3D.prototype.lookAtY = function (targetPos) {
  const objPos = this.position;
  const direction = new THREE.Vector3(
    targetPos.x - objPos.x,
    0, // Ignore Y-axis
    targetPos.z - objPos.z
  );
  direction.normalize();
  const angle = Math.atan2(direction.x, direction.z);
  this.rotation.y = angle;
};

THREE.Object3D.prototype.getHeight = function () {
  const box = new THREE.Box3().setFromObject(this);
  return box.max.y - box.min.y;
};

THREE.Object3D.prototype.traverseUp = function (callback) {
  let current = this;
  while (current) {
    callback(current);
    current = current.parent;
  }
};
