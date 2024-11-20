import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { modelPaths } from "./modelPaths";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");
loader.setDRACOLoader(dracoLoader);

class ModelsLoader {
  constructor() {
    this.models = {};
  }

  async load() {
    const promises = Object.entries(modelPaths).map(([name, path]) => {
      return new Promise((resolve) => {
        loader.load(
          path,
          (gltf) => {
            this.models[name] = gltf;
            gltf.scene.castShadow = true;
            gltf.scene.receiveShadow = true;
            resolve();
          },
          null,
          (error) => {
            console.warn(`Error while loading model: ${name}`, error);
          }
        );
      });
    });

    await Promise.all(promises);
  }
}

export default ModelsLoader;
