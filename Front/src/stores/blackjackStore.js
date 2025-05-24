import { create } from "zustand";

const defaultState = {
  isVisible: false,
  newPlayer: null,
  step: "wait",
  id: null,
  turn: null,
  cards: [],
  dealerCards: [],
  bet: 0,
  hasBeaten: null,
  hasHit: null,
  hasStand: null,
  result: null,
  playerState: null,
};

export const useBlackjackStore = create((set) => ({
  ...defaultState,
  setVisible: (isVisible) => set({ isVisible }),
  newPlayerJoined: (newPlayer) => set({ newPlayer }),
  setStep: (step) => set({ step }),
  setId: (id) => set({ id }),
  setTurn: (turn) => set({ turn }),
  addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
  addDealerCard: (card) =>
    set((state) => ({ dealerCards: [...state.dealerCards, card] })),
  setBet: (bet) => set({ bet }),
  setHasBeaten: () => set({ hasBeaten: true }),
  setHasHit: () => set({ hasHit: true }),
  setHasStand: () => set({ hasStand: true }),
  setPlayerState: (playerState) => set({ playerState }),
  setResult: (result) => set({ result }),
  reset: () =>
    set((state) => ({
      ...defaultState,
      id: state.id,
    })),
}));
