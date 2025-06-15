import defaultSoundPaths from "./soundPaths";

class SoundPlayer {
  constructor() {
    this.subscribeToVolumeChange();
  }

  getCurrentVolume() {
    return window.soundStore.getState().uiVolume;
  }

  subscribeToVolumeChange() {
    window.soundStore.subscribe((state, prevState) => {
      if (state.uiVolume === prevState.uiVolume) return;
      this.updateVolumes(state.uiVolume);
    });
  }

  loadSounds(soundPaths = defaultSoundPaths) {
    this.sounds = {};
    const currentVolume = this.getCurrentVolume();
    Object.entries(soundPaths).forEach(([name, path]) => {
      this.sounds[name] = new Audio(path);
      this.sounds[name].volume = currentVolume;
    });
  }

  updateVolumes(newVolume) {
    Object.values(this.sounds).forEach((audio) => {
      audio.volume = newVolume;
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
