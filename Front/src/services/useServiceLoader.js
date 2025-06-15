import CommandManager from "@Game/CommandManager";
import { initStoreRegistry } from "../stores/storeRegistry";
import TextManager from "@Common/TextManager";
import SoundPlayer from "@Common/SoundPlayer";
import { useState, useEffect } from "react";

export const useServiceLoader = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    initStoreRegistry();

    const textManager = new TextManager();
    window.textManager = textManager;
    window.t = textManager.get.bind(textManager);

    const soundPlayer = new SoundPlayer();
    soundPlayer.loadSounds();
    window.soundPlayer = soundPlayer;

    const commandManager = new CommandManager();
    window.commandManager = commandManager;

    setIsLoaded(true);
  }, []);

  return isLoaded;
};
