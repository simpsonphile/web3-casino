import * as THREE from "three";

const POSSIBLE_MODES = ["third-person", "first-person", "top-down"];

class ActorCamera extends THREE.PerspectiveCamera {
  constructor({ fov, aspect, near, far, target }) {
    super(fov, aspect, near, far);
    this.target = target;

    this.yaw = 0;
    this.pitch = 0;
    this.rotationQuat = new THREE.Quaternion();
    this.pitchQuat = new THREE.Quaternion();
    this.yawQuat = new THREE.Quaternion();
    this.mouseSensitivity = 0.002;

    this.firstPersonOffset = new THREE.Vector3(0, 1.8, -0.2);
    this.thirdPersonOffset = new THREE.Vector3(0, 2, 4);
    this.topDownOffset = new THREE.Vector3(0, 3.5, 0);

    this.mode = "third-person";
  }

  switchMode(newMode) {
    if (!POSSIBLE_MODES.includes(newMode)) {
      throw Error(`no such actor camera mode: ${newMode}`);
    }

    this.mode = newMode;
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

  positionCamera() {
    if (this.mode === "third-person") {
      this.positionCameraBehindActor();
    } else if (this.mode === "first-person") {
      this.positionCameraFromActorEyes();
    } else if (this.mode === "top-down") {
      this.positionCameraAtTopOfActor();
    }
  }

  positionCameraBehindActor() {
    const cameraOffset = this.thirdPersonOffset.clone();
    cameraOffset.applyQuaternion(this.rotationQuat);
    this.position.copy(this.target.position).add(cameraOffset);
  }

  positionCameraAtTopOfActor() {
    const cameraOffset = this.topDownOffset.clone();
    // cameraOffset.applyQuaternion(this.rotationQuat);
    this.position.copy(this.target.position).add(cameraOffset);
  }

  positionCameraFromActorEyes() {
    // works shity
    const cameraOffset = this.firstPersonOffset.clone();
    cameraOffset.applyQuaternion(this.rotationQuat); // Align with player's orientation
    this.position.copy(this.target.position).add(cameraOffset);
    this.quaternion.copy(this.rotationQuat);
  }
}

export default ActorCamera;
