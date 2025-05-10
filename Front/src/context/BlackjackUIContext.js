import { createContext, useContext, useState, useReducer } from "react";

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

const BlackjackUIContext = createContext(defaultState);

export const useBlackjackUIContext = () => useContext(BlackjackUIContext);

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "setVisible":
      return { ...state, isVisible: payload };
    case "newPlayerJoined":
      return { ...state, newPlayer: payload };
    case "setStep":
      return { ...state, step: payload };
    case "setId":
      return { ...state, id: payload };
    case "setTurn":
      return { ...state, turn: payload };
    case "addCard":
      return { ...state, cards: [...state.cards, payload] };
    case "addDealerCard":
      return { ...state, dealerCards: [...state.dealerCards, payload] };
    case "setBet":
      return { ...state, bet: payload };
    case "setHasBeaten":
      return { ...state, hasBeaten: true };
    case "setHasHit":
      return { ...state, hasHit: true };
    case "setHasStand":
      return { ...state, hasStand: true };
    case "setPlayerState":
      return { ...state, playerState: payload };
    case "setResult":
      return { ...state, result: payload };
    case "reset":
      return { ...defaultState, id: state.id };
    default:
      return state;
  }
};

export const BlackjackUIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <BlackjackUIContext.Provider value={{ state, dispatch }}>
      {children}
    </BlackjackUIContext.Provider>
  );
};
