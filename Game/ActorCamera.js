import * as THREE from "three";

const POSSIBLE_MODES = ["third-person", "first-person", "top-down"];

const FOV_MODE_MAP = {
  "third-person": 75,
  "first-person": 60,
  "top-down": 75,
};

const SPRINT_FOV_MODE_MAP = {
  "third-person": 90,
  "first-person": 90,
  "top-down": 90,
};

const MIN_PITCH = -60;
const MAX_PITCH = 15;

const CAMERA_ROTATION_LAG_SPEED = 7.5;
const FOV_LAG_SPEED = 10;
const OFFSET_LERP_SPEED = 10;

class ActorCamera extends THREE.PerspectiveCamera {
  constructor({ aspect, near, far, target }) {
    super(FOV_MODE_MAP["third-person"], aspect, near, far);
    this.targetFov = FOV_MODE_MAP["third-person"];

    this.currentOffset = new THREE.Vector3();

    this.target = target;
    this.layers.enable(1);

    this.yaw = 0;
    this.pitch = 0;
    this.rotationQuat = new THREE.Quaternion();
    this.pitchQuat = new THREE.Quaternion();
    this.yawQuat = new THREE.Quaternion();
    this.mouseSensitivity = 0.002;

    this.firstPersonOffset = new THREE.Vector3(0, 0, 0);
    this.thirdPersonOffset = new THREE.Vector3(0, 2, 4);
    this.topDownOffset = new THREE.Vector3(0, 3.5, 0);

    this.mode = "third-person";
  }

  initUpdate() {
    window.deltaUpdater.add(this.update.bind(this));
  }

  updateTargetFov() {
    this.targetFov = this.isSprinting
      ? SPRINT_FOV_MODE_MAP[this.mode]
      : FOV_MODE_MAP[this.mode];
  }

  switchMode(newMode) {
    if (!POSSIBLE_MODES.includes(newMode)) {
      throw Error(`no such actor camera mode: ${newMode}`);
    }

    this.mode = newMode;

    this.target.visible = newMode !== "first-person";

    this.updateTargetFov();
  }

  setSprinting(isSprinting) {
    this.isSprinting = isSprinting;
    this.updateTargetFov();
  }

  updateCameraRotation(deltaX, deltaY) {
    const minPitch = THREE.MathUtils.degToRad(MIN_PITCH);
    const maxPitch = THREE.MathUtils.degToRad(MAX_PITCH);

    this.yaw -= deltaX * this.mouseSensitivity;
    this.pitch -= deltaY * this.mouseSensitivity;
    this.pitch = Math.max(minPitch, Math.min(maxPitch, this.pitch));

    // Compute target rotation
    this.yawQuat.setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.yaw);
    this.pitchQuat.setFromAxisAngle(new THREE.Vector3(1, 0, 0), this.pitch);

    this.rotationQuat
      .identity()
      .multiplyQuaternions(this.yawQuat, this.pitchQuat);
  }

  getOffset() {
    switch (this.mode) {
      case "third-person":
        return this.thirdPersonOffset.clone().applyQuaternion(this.quaternion);
      case "first-person":
        return this.firstPersonOffset.clone().applyQuaternion(this.quaternion);
      case "top-down":
        return this.topDownOffset.clone();
      default:
        return new THREE.Vector3();
    }
  }

  getBasePosition() {
    const playerPos = this.target.position.clone();
    if (this.mode === "first-person") {
      return playerPos.add(new THREE.Vector3(0, 1.6, 0));
    }
    return playerPos;
  }

  updateCameraPosition() {
    this.position.copy(this.getBasePosition()).add(this.getOffset());
  }

  update(deltaTime) {
    this.quaternion.slerp(
      this.rotationQuat,
      1 - Math.exp(-CAMERA_ROTATION_LAG_SPEED * deltaTime)
    );

    if (this.fov !== this.targetFov) {
      this.fov +=
        (this.targetFov - this.fov) *
        (1 - Math.exp(-FOV_LAG_SPEED * deltaTime));
      this.updateProjectionMatrix();
    }

    this.updateCameraPosition();
  }
}

export default ActorCamera;
