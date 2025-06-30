import { create } from "zustand";

const betSteps = [1, 5, 10, 25, 50, 100, 250];

const defaultState = {
  isVisible: false,
  step: "main",
  bet: 1,
};

export const useSlotsStore = create((set) => ({
  ...defaultState,

  setVisible: (isVisible) => set({ isVisible }),
  setStep: (step) => set({ step }),
  setBet: (bet) => set({ bet }),
  increaseBet: () =>
    set((state) => {
      let currentBet = state.bet;
      const currentIndex = betSteps.indexOf(currentBet);
      if (currentIndex < betSteps.length - 1) {
        currentBet = betSteps[currentIndex + 1];
      }
      return {
        bet: currentBet,
      };
    }),

  decreaseBet: () =>
    set((state) => {
      let currentBet = state.bet;
      const currentIndex = betSteps.indexOf(currentBet);
      if (currentIndex > 0) {
        currentBet = betSteps[currentIndex - 1];
      }
      return {
        bet: currentBet,
      };
    }),

  reset: () =>
    set(() => ({
      ...defaultState,
    })),
}));
