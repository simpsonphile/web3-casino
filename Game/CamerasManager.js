import * as THREE from "three";

class CamerasManager {
  constructor() {
    this.cameras = {};
    this.activeCamera = null;
  }

  setOnCameraChange(handler) {
    this._onCameraChange = () => handler(this);
  }

  setOnCameraTransitioning(handler) {
    this._onCameraTransitioning = () => handler(this);
  }

  addCamera(name, camera) {
    this.cameras[name] = camera;
    if (!this.activeCamera) {
      this.activeCamera = camera;
    }
  }

  getCamera(name) {
    return this.cameras[name];
  }

  setActiveCamera(name, isTransitioning, onFinish) {
    if (this.isTransitioning) return;

    if (!this.cameras[name]) {
      console.warn(`Camera with name ${name} does not exist.`);
      return;
    }

    if (!isTransitioning) {
      this.activeCamera = this.cameras[name];
      this._onCameraChange();
      onFinish();
    } else {
      this.isTransitioning = isTransitioning;
      this.transitionProgress = 0;
      this.transitionTargetName = name;
      this.startTransitionCameraPosition = new THREE.Vector3().copy(
        this.activeCamera.position
      );
      this.startTransitionCameraQuaternion = new THREE.Quaternion().copy(
        this.activeCamera.quaternion
      );
      this._onCameraTransitioning();
      this.onFinish = onFinish;
    }
  }

  resetActiveCameraTransforms() {
    this.activeCamera.position.set(
      this.startTransitionCameraPosition.x,
      this.startTransitionCameraPosition.y,
      this.startTransitionCameraPosition.z
    );
    this.activeCamera.quaternion.set(
      this.startTransitionCameraQuaternion.x,
      this.startTransitionCameraQuaternion.y,
      this.startTransitionCameraQuaternion.z,
      this.startTransitionCameraQuaternion.w
    );
  }

  update(delta) {
    if (!this.isTransitioning) return;
    const targetCamera = this.cameras[this.transitionTargetName];

    if (this.transitionProgress >= 1) {
      this.isTransitioning = false;
      this.resetActiveCameraTransforms();
      this.activeCamera = targetCamera;
      this._onCameraChange();
      this.onFinish?.();
      this.onFinish = null;
      return;
    }

    this.transitionProgress += delta * 30;
    this.transitionProgress = Math.min(this.transitionProgress, 1);

    const newPos = this.activeCamera.position.lerpVectors(
      this.startTransitionCameraPosition,
      targetCamera.position,
      this.transitionProgress
    );

    this.activeCamera.position.set(newPos.x, newPos.y, newPos.z);

    const newQ = this.activeCamera.quaternion.slerpQuaternions(
      this.startTransitionCameraQuaternion,
      targetCamera.quaternion,
      this.transitionProgress
    );

    this.activeCamera.quaternion.set(newQ.x, newQ.y, newQ.z, newQ.w);
  }

  getActiveCamera() {
    return this.activeCamera;
  }

  removeCamera(name) {
    if (this.cameras[name]) {
      delete this.cameras[name];
      if (this.activeCamera === this.cameras[name]) {
        this.activeCamera = Object.values(this.cameras)[0] || null;
      }
    } else {
      console.warn(`Camera with name ${name} does not exist.`);
    }
  }

  updateCamerasAspect(aspectRatio) {
    for (let name in this.cameras) {
      const camera = this.cameras[name];
      camera.aspect = aspectRatio;
      camera.updateProjectionMatrix();
    }
  }
}

export default CamerasManager;
