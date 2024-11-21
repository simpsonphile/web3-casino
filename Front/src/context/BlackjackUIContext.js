import { createContext, useContext, useState } from "react";

const defaultState = {
  nickname: null,
};

const BlackjackUIContext = createContext(defaultState);

export const useBlackjackUIContext = () => useContext(BlackjackUIContext);

export const BlackjackUIProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(null);
  const [data, setData] = useState(null);

  const update = (step, data) => {
    setStep(step);
    setData(data);
  };

  return (
    <BlackjackUIContext.Provider
      value={{ isVisible, setIsVisible, step, data, update }}
    >
      {children}
    </BlackjackUIContext.Provider>
  );
};
