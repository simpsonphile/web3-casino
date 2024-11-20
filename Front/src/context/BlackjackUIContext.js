import { createContext, useContext, useState } from "react";

const defaultState = {
  nickname: null,
};

const BlackjackUIContext = createContext(defaultState);

export const useBlackjackUIContext = () => useContext(BlackjackUIContext);

export const BlackjackUIProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(null);

  return (
    <BlackjackUIContext.Provider
      value={{ isVisible, setIsVisible, step, setStep }}
    >
      {children}
    </BlackjackUIContext.Provider>
  );
};
