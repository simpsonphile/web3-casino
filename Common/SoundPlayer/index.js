import defaultSoundPaths from "./soundPaths";

class SoundPlayer {
  constructor() {}

  loadSounds(soundPaths = defaultSoundPaths) {
    this.sounds = {};
    Object.entries(soundPaths).forEach(([name, path]) => {
      this.sounds[name] = new Audio(path);
    });
  }

  playSound(name) {
    if (this.sounds[name]) {
      this.sounds[name].currentTime = 0; // Reset to start
      this.sounds[name].play().catch((error) => {
        console.error(`Error playing sound ${name}:`, error);
      });
    } else {
      console.error(`Sound "${name}" not found!`);
    }
  }
}

export default SoundPlayer;
