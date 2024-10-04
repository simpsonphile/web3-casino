import * as THREE from "three";
import { sounds } from "./soundPaths";

class SoundLoader {
  constructor() {
    this.audioLoader = new THREE.AudioLoader();
    this.soundBuffers = {};
  }

  async load() {
    return Promise.all(
      sounds.map((sound) => {
        return new Promise((resolve, reject) => {
          this.audioLoader.load(
            sound.url,
            (buffer) => {
              this.soundBuffers[sound.name] = buffer;
              resolve();
            },
            undefined,
            reject
          );
        });
      })
    );
  }

  getSoundBuffer(name) {
    if (this.soundBuffers[name]) {
      return this.soundBuffers[name];
    }
    console.error(`Sound "${name}" not found!`);
    return null;
  }
}
export default SoundLoader;
