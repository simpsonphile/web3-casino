import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSoundStore = create(
  persist(
    (set) => ({
      uiVolume: 1,
      worldVolume: 1,

      setUiVolume: (volume) => set({ uiVolume: volume }),
      setWorldVolume: (volume) => set({ worldVolume: volume }),
    }),
    {
      name: "sound-settings",
    }
  )
);
