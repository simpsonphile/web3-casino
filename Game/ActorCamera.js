import * as THREE from "three";

const POSSIBLE_MODES = ["third-person", "first-person", "top-down"];

const FOV_MODE_MAP = {
  "third-person": 75,
  "first-person": 60,
  "top-down": 75,
};

class ActorCamera extends THREE.PerspectiveCamera {
  constructor({ aspect, near, far, target }) {
    super(FOV_MODE_MAP["third-person"], aspect, near, far);
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

  init() {
    window.deltaUpdater.add(this.updateCamera.bind(this));
  }

  switchMode(newMode) {
    if (!POSSIBLE_MODES.includes(newMode)) {
      throw Error(`no such actor camera mode: ${newMode}`);
    }

    this.mode = newMode;

    this.fov = FOV_MODE_MAP[newMode];
    this.updateProjectionMatrix();
  }

  updateCameraRotation(deltaX, deltaY) {
    const minPitch = THREE.MathUtils.degToRad(-60);
    const maxPitch = THREE.MathUtils.degToRad(15);

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

  updateCamera(deltaTime) {
    const lagSpeed = 5.0; // Tweak as needed

    // Initialize if needed
    if (!this.rotationQuat) {
      this.rotationQuat = this.quaternion.clone(); // match current rotation
    }

    this.quaternion.slerp(
      this.rotationQuat,
      1 - Math.exp(-lagSpeed * deltaTime)
    );

    this.positionCamera();
  }

  positionCamera() {
    if (this.mode === "third-person") {
      this.positionCameraBehindActor();
      this.target.visible = true;
    } else if (this.mode === "first-person") {
      this.positionCameraFromActorEyes();
      this.target.visible = false;
    } else if (this.mode === "top-down") {
      this.positionCameraAtTopOfActor();
      this.target.visible = true;
    }
  }

  positionCameraBehindActor() {
    const cameraOffset = this.thirdPersonOffset.clone();
    cameraOffset.applyQuaternion(this.quaternion);
    this.position.copy(this.target.position).add(cameraOffset);
  }

  positionCameraAtTopOfActor() {
    const cameraOffset = this.topDownOffset.clone();
    // cameraOffset.applyQuaternion(this.rotationQuat);
    this.position.copy(this.target.position).add(cameraOffset);
  }

  positionCameraFromActorEyes() {
    const cameraOffset = this.firstPersonOffset.clone();
    cameraOffset.applyQuaternion(this.quaternion);
    const newPos = this.target.position.clone();
    newPos.add(new THREE.Vector3(0, 1.6, 0));
    this.position.copy(newPos).add(cameraOffset);
  }
}

export default ActorCamera;
