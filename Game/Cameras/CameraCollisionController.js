import * as THREE from "three";

class CameraCollisionController {
  constructor(camera, player) {
    this.camera = camera;
    this.player = player;
    this.scene = window.scene;
    this.raycaster = new THREE.Raycaster();
    this.raycaster.layers.set(3);
    this.safetyOffset = 0.2;
  }

  getAdjustedCameraPosition(desiredCameraPos) {
    const playerHead = this.player.position
      .clone()
      .add(new THREE.Vector3(0, 1.6, 0));
    const direction = new THREE.Vector3()
      .subVectors(desiredCameraPos, playerHead)
      .normalize();
    const distance = desiredCameraPos.distanceTo(playerHead);

    this.raycaster.set(playerHead, direction);
    this.raycaster.far = distance;

    const hits = this.raycaster.intersectObjects(this.scene.children, true);

    for (const hit of hits) {
      console.log(hit);
      if (hit.object === this.player || hit.object.userData.ignoreCameraClip)
        continue;

      return new THREE.Vector3().addVectors(
        playerHead,
        direction.multiplyScalar(hit.distance - this.safetyOffset)
      );
    }

    return desiredCameraPos;
  }
}

export default CameraCollisionController;
