import { FontLoader as FontLoaderThree } from "three/addons/loaders/FontLoader.js";
import { fontPaths } from "./fontPaths";

const loader = new FontLoaderThree();

class FontLoader {
  constructor() {
    this._fonts = {};
  }

  async load() {
    const promises = Object.entries(fontPaths).map(([name, path]) => {
      return new Promise((resolve) => {
        loader.load(path, (font) => {
          this._fonts[name] = font;
        });
        resolve();
      });
    });

    await Promise.all(promises);
  }

  get() {
    return this._fonts;
  }
}

export default FontLoader;
