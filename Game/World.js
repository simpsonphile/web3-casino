import * as THREE from "three";
import LightmapApplier from "./LightmapApplier";
import lightmap from "@Assets/lightmap.png";

class World {
  constructor() {
    this.loadLevel();
    // this.applyLightmap();
    this.applyLight();
  }

  loadLevel() {
    this.scene = window.models.world.scene.clone();
    window.scene.add(this.scene);
  }

  applyLightmap() {
    const textureLoader = new THREE.TextureLoader();
    const lightMapTexture = textureLoader.load(lightmap);

    lightMapTexture.flipY = false;
    lightMapTexture.channel = 1;
    lightMapTexture.encoding = THREE.sRGBEncoding;

    const ligthmapApplier = new LightmapApplier(lightMapTexture, 20);
    ligthmapApplier.applyToScene(window.models.world.scene);
  }

  applyLight() {
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  }
}
export default World;
