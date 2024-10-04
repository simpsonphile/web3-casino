import * as THREE from "three";

class ThirdPersonCamera extends THREE.PerspectiveCamera {
  constructor({ fov, aspect, near, far, target }) {
    super(fov, aspect, near, far);
    this.target = target;
    this.yaw = 0;
    this.pitch = 0;
    this.rotationQuat = new THREE.Quaternion();
    this.pitchQuat = new THREE.Quaternion();
    this.yawQuat = new THREE.Quaternion();
    this.mouseSensitivity = 0.002;
  }

  updateCameraRotation(deltaX, deltaY) {
    this.yaw -= deltaX * this.mouseSensitivity;
    this.pitch -= deltaY * this.mouseSensitivity;

    this.pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitch));

    this.yawQuat.setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.yaw);
    this.pitchQuat.setFromAxisAngle(new THREE.Vector3(1, 0, 0), this.pitch);
    this.rotationQuat
      .identity()
      .multiplyQuaternions(this.yawQuat, this.pitchQuat);
    this.quaternion.copy(this.rotationQuat);
  }

  positionCameraBehindPlayer() {
    const cameraOffset = new THREE.Vector3(0, 2, 4);
    cameraOffset.applyQuaternion(this.rotationQuat);
    this.position.copy(this.target.position).add(cameraOffset);
  }
}

export default ThirdPersonCamera;
