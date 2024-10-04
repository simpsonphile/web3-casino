import * as THREE from "three";

class SoundSource {
  constructor(target, songName, listener) {
    this.positionalAudio = new THREE.PositionalAudio(listener);
    this.loadSound(songName);

    target.add(this.positionalAudio);
  }

  loadSound(songName) {
    const buffer = window.sounds[songName];
    if (buffer) {
      this.positionalAudio.setBuffer(buffer);
      this.positionalAudio.setLoop(true); // Set to true if you want to loop the sound
      this.positionalAudio.setVolume(1); // Set initial volume
    } else {
      console.error(`Failed to load sound: ${songName}`);
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
