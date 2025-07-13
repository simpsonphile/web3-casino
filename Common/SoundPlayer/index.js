import { Howl } from "howler";
import defaultSoundPaths from "./soundPaths";

class SoundPlayer {
  constructor() {
    this.sounds = {};
    this.loadSounds();
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
    const volume = this.getCurrentVolume();
    this.sounds = {};

    Object.entries(soundPaths).forEach(([name, path]) => {
      this.sounds[name] = new Howl({
        src: [path],
        volume,
      });
    });
  }

  updateVolumes(newVolume) {
    Object.values(this.sounds).forEach((howl) => {
      howl.volume(newVolume);
    });
  }

  playSound(name, rate = 1) {
    const sound = this.sounds[name];
    if (!sound) {
      console.error(`Sound "${name}" not found!`);
      return;
    }

    const id = sound.play();
    sound.rate(rate, id);
  }
}

export default SoundPlayer;
