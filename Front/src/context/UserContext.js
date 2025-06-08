import { createContext, useContext, useReducer } from "react";

function generateGuestNickname() {
  const digits = Math.floor(1000000 + Math.random() * 9000000); // Ensures 7 digits
  return "quest_" + digits;
}

const defaultState = {
  nickname: null,
  asGuest: false,
};

const UserContext = createContext(defaultState);

export const useUserContext = () => useContext(UserContext);

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "setUser":
      return { ...payload };
    case "setGuestUser":
      return { asGuest: true, nickname: generateGuestNickname() };
    case "reset":
      return { ...defaultState };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
