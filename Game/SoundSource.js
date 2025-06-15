import * as THREE from "three";

// todo In moment of writing i think that we should agregate all SoundSources to one 3DSoundManager
// implement subscription to world volume
class SoundSource {
  constructor(target, soundName, listener) {
    this.positionalAudio = new THREE.PositionalAudio(listener);
    this.loadSound(soundName);

    target.add(this.positionalAudio);
  }

  loadSound(soundName) {
    const buffer = window.sounds[soundName];
    if (buffer) {
      this.positionalAudio.setBuffer(buffer);
      this.positionalAudio.setLoop(true); // Set to true if you want to loop the sound
      this.positionalAudio.setVolume(1); // Set initial volume
    } else {
      console.error(`Failed to load sound: ${soundName}`);
    }
  }

  play() {
    this.positionalAudio.play();
  }

  stop() {
    this.positionalAudio.stop();
  }
}

export default SoundSource;
