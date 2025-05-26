import { create } from "zustand";

export const useAtmStore = create((set) => ({
  isVisible: false,
  step: "main",

  setIsVisible: (isVisible) => set({ isVisible: !!isVisible }),
  setStep: (step) => set({ step }),
}));
