import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { modelPaths } from "./modelPaths";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { KTX2Loader } from "three/addons/loaders/KTX2Loader.js";

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
const ktx2Loader = new KTX2Loader();

class ModelsLoader {
  constructor({ onProgressUpdate, onLoaded }) {
    this.models = {};
    this.onLoaded = onLoaded;
    this.onProgressUpdate = onProgressUpdate;

    ktx2Loader.setTranscoderPath("/game-assets/ktx2/");
    dracoLoader.setDecoderPath("/game-assets/draco/");
    loader.setDRACOLoader(dracoLoader);
    loader.setKTX2Loader(ktx2Loader);
    ktx2Loader.detectSupport(window.renderer.renderer);
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
          (event) => this?.onProgressUpdate(name, event.loaded, event.total),
          (error) => {
            console.warn(`Error while loading model: ${name}`, error);
          }
        );
      });
    });

    await Promise.all(promises);

    this?.onLoaded?.();
  }
}

export default ModelsLoader;
