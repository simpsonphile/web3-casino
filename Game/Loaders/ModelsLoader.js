import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { modelPaths } from "./modelPaths";

const loader = new GLTFLoader();

class ModelsLoader {
  constructor() {
    this.models = {};
  }

  async load() {
    const promises = Object.entries(modelPaths).map(([name, path]) => {
      return new Promise((resolve) => {
        loader.load(path, (gltf) => {
          this.models[name] = gltf;
          gltf.scene.castShadow = true;
          gltf.scene.receiveShadow = true;
          resolve();
        });
      });
    });

    await Promise.all(promises);
  }
}

export default ModelsLoader;
