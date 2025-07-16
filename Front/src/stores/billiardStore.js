import { create } from "zustand";

const POSSIBLE_STEPS = ["yourTurn", "opponentTurn", "cuePlacement", "gameOver"];

const defaultState = {
  isVisible: false,
  strength: 0,
  step: "yourTurn",
  yourTurn: true,
  isPhysicsRunning: false,
  didPlayerWin: null,
};

export const useBilliardStore = create((set) => ({
  ...defaultState,
  setIsVisible: (isVisible) => set({ isVisible: !!isVisible }),
  setStrength: (strength) => set({ strength }),
  setStep: (step) => {
    if (POSSIBLE_STEPS.includes(step)) set({ step });
  },
  switchTurn: () => set((state) => ({ yourTurn: !state.yourTurn })),
  setPhysicsRunning: (state) => set({ isPhysicsRunning: state }),
  setDidPlayerWin: (didPlayerWin) => set({ didPlayerWin }),
  reset: () => set({ ...defaultState }),
}));
