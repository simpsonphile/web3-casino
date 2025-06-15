import { create } from "zustand";
import { persist } from "zustand/middleware";

const defaultState = {
  uiVolume: 1,
  worldVolume: 1,
};

export const useSoundStore = create(
  persist(
    (set) => ({
      ...defaultState,

      setUiVolume: (volume) => set({ uiVolume: volume }),
      setWorldVolume: (volume) => set({ worldVolume: volume }),
      reset: () => set({ ...defaultState }),
    }),
    {
      name: "sound-settings",
    }
  )
);
