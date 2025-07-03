import * as THREE from "three";
import CameraCollisionController from "./CameraCollisionController";

const POSSIBLE_MODES = ["third-person", "first-person", "top-down"];

const CAMERA_ROTATION_LAG_SPEED = 7.5;
const FOV_LAG_SPEED = 10;
const OFFSET_LERP_SPEED = 10;
const MAX_LERP_SPEED_MULTIPLIER = 10;
const LERP_RAMP_SPEED = 1.0;

const CAMERA_CONFIG = {
  modes: {
    "third-person": {
      offset: new THREE.Vector3(0, 2, 4),
      fov: 75,
      sprintFov: 90,
      pitchLimits: {
        min: THREE.MathUtils.degToRad(-60),
        max: THREE.MathUtils.degToRad(15),
      },
    },
    "first-person": {
      offset: new THREE.Vector3(0, 0, 0),
      fov: 60,
      sprintFov: 90,
      pitchLimits: {
        min: THREE.MathUtils.degToRad(-60),
        max: THREE.MathUtils.degToRad(15),
      },
    },
    "top-down": {
      offset: new THREE.Vector3(0, 3.5, 0),
      fov: 75,
      sprintFov: 90,
      pitchLimits: {
        min: THREE.MathUtils.degToRad(-90),
        max: THREE.MathUtils.degToRad(0),
      },
    },
  },
};

class ActorCamera extends THREE.PerspectiveCamera {
  constructor({ aspect, near, far, target }) {
    const fov = CAMERA_CONFIG.modes["third-person"].fov;
    super(fov, aspect, near, far);
    this.targetFov = fov;

    this.currentOffset = new THREE.Vector3();

    this.target = target;
    this.layers.enable(1);

    this.yaw = 0;
    this.pitch = 0;
    this.rotationQuat = new THREE.Quaternion();
    this.pitchQuat = new THREE.Quaternion();
    this.yawQuat = new THREE.Quaternion();
    this.mouseSensitivity = 0.002;

    this.mode = "third-person";
    if (target) this.setTarget(target);
  }

  setTarget(target) {
    if (!(target instanceof THREE.Object3D)) {
      console.warn("target object is not an instance of THREE.Object3D");
      return;
    }

    this.target = target;
    this.collisionController = new CameraCollisionController(this, this.target);
  }

  getCurrentModeConfig() {
    return CAMERA_CONFIG.modes[this.mode];
  }

  startUpdating() {
    window.deltaUpdater.add(this.update.bind(this));
  }

  updateTargetFov() {
    const config = this.getCurrentModeConfig();
    this.targetFov = this.isSprinting ? config.sprintFov : config.fov;
  }

  switchMode(newMode) {
    if (!POSSIBLE_MODES.includes(newMode)) {
      throw Error(`no such actor camera mode: ${newMode}`);
    }

    this.mode = newMode;

    // onSwitchMode(newMode)
    this.target.visible = newMode !== "first-person";

    this.updateTargetFov();
  }

  setSprinting(isSprinting) {
    this.isSprinting = isSprinting;
    this.updateTargetFov();
  }

  updateCameraRotation(deltaX, deltaY) {
    const config = this.getCurrentModeConfig();

    this.yaw -= deltaX * this.mouseSensitivity;
    this.pitch = THREE.MathUtils.clamp(
      this.pitch - deltaY * this.mouseSensitivity,
      config.pitchLimits.min,
      config.pitchLimits.max
    );
    this.rotationQuat.setFromEuler(
      new THREE.Euler(this.pitch, this.yaw, 0, "YXZ")
    );
  }

  getOffset() {
    const config = this.getCurrentModeConfig();
    switch (this.mode) {
      case "third-person":
        return config.offset.clone().applyQuaternion(this.quaternion);
      case "first-person":
        return config.offset.clone().applyQuaternion(this.quaternion);
      case "top-down":
        return config.offset.clone();
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

  updateCameraPosition(deltaTime) {
    const desired = this.getBasePosition().add(this.getOffset());
    const { position: adjusted, isColliding } =
      this.collisionController.getAdjustedCameraPosition(desired);

    if (isColliding) {
      this.notCollidingTime = 0;
    } else {
      this.notCollidingTime = (this.notCollidingTime || 0) + deltaTime;
    }

    const multiplier = Math.min(
      MAX_LERP_SPEED_MULTIPLIER,
      1 +
        (this.notCollidingTime / LERP_RAMP_SPEED) *
          (MAX_LERP_SPEED_MULTIPLIER - 1)
    );
    const lerpSpeed = OFFSET_LERP_SPEED * multiplier;

    this.position.lerp(adjusted, 1 - Math.exp(-lerpSpeed * deltaTime));
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

    this.updateCameraPosition(deltaTime);
  }
}

export default ActorCamera;
