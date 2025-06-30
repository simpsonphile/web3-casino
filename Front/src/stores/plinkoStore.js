import { create } from "zustand";

const betSteps = [1, 5, 10, 25, 50, 100, 250];
const ballsSteps = [1, 5, 10, 25, 50, 100, 250];
const difficultyLevels = ["easy", "medium", "hard"];

const defaultState = {
  isVisible: false,
  step: "main",
  bet: betSteps[0],
  balls: ballsSteps[0],
  difficulty: difficultyLevels[0],
};

export const usePlinkoStore = create((set) => ({
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

  increaseBalls: () =>
    set((state) => {
      let currentBalls = state.balls;
      const currentIndex = ballsSteps.indexOf(currentBalls);
      if (currentIndex < ballsSteps.length - 1) {
        currentBalls = ballsSteps[currentIndex + 1];
      }
      return {
        balls: currentBalls,
      };
    }),

  decreaseBalls: () =>
    set((state) => {
      let currentBalls = state.balls;
      const currentIndex = ballsSteps.indexOf(currentBalls);
      if (currentIndex > 0) {
        currentBalls = ballsSteps[currentIndex - 1];
      }
      return {
        balls: currentBalls,
      };
    }),

  changeDifficulty: (difficulty) =>
    set((state) => {
      if (difficultyLevels.includes(difficulty)) {
        return {
          difficulty,
        };
      }
      const currentDifficultyLevel = state.difficulty;
      const currentIndex = difficultyLevels.indexOf(currentDifficultyLevel);
      const nextIndex = (currentIndex + 1) % difficultyLevels.length;
      return {
        difficulty: difficultyLevels[nextIndex],
      };
    }),

  reset: () =>
    set(() => ({
      ...defaultState,
    })),
}));
