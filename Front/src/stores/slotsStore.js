import { create } from "zustand";

const defaultState = {
  isVisible: false,
  step: "main",
  bet: 0,
};

export const useSlotsStore = create((set) => ({
  ...defaultState,

  setVisible: (isVisible) => set({ isVisible }),
  setStep: (step) => set({ step }),
  setBet: (bet) => set({ bet }),
  increaseBet: (val = 1) => {
    set((state) => ({
      bet: state.bet + val,
    }));
  },
  decreaseBet: (val = 1) =>
    set((state) => ({
      bet: Math.max(0, state.bet - val),
    })),

  reset: () =>
    set(() => ({
      ...defaultState,
      // If you want to keep some property from current state, add here
      // id: state.id,
    })),
}));
