import * as THREE from "three";

class AimingLine {
  constructor({ color = 0xffaa00, radius = 0.01 } = {}) {
    this.geometry = new THREE.CylinderGeometry(radius, radius, 1, 8, 1, true);
    this.material = new THREE.MeshBasicMaterial({ color });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  getLine() {
    return this.mesh;
  }

  update(start, end) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();

    // Set new position (midpoint)
    const center = new THREE.Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5);
    this.mesh.position.copy(center);

    // Align with direction
    this.mesh.scale.set(1, length, 1); // scale Y to match new length

    // Default cylinder goes from (0, -0.5, 0) to (0, 0.5, 0), so rotate it
    this.mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.clone().normalize()
    );
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}

export default AimingLine;
