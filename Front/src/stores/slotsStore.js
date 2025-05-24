import { create } from "zustand";

const defaultState = {
  isVisible: false,
  step: "wait",
  bet: 0,
};

export const useSlotsStore = create((set) => ({
  ...defaultState,

  setVisible: (isVisible) => set({ isVisible }),
  setStep: (step) => set({ step }),
  setBet: (bet) => set({ bet }),

  reset: () =>
    set((state) => ({
      ...defaultState,
      // If you want to keep some property from current state, add here
      // id: state.id,
    })),
}));
