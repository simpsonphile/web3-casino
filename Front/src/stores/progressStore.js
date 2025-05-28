import { create } from "zustand";

const defaultState = {
  progress: 0,
  isLoading: false,
};

export const useProgressStore = create((set) => ({
  ...defaultState,

  setProgress: (progress) => set({ progress }),
  setLoading: (isLoading) => set({ isLoading }),
}));
