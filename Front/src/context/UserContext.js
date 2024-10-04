import { createContext, useContext, useReducer } from "react";

const defaultState = {
  nickname: null,
};

const UserContext = createContext(defaultState);

export const useUserContext = () => useContext(UserContext);

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "setUser":
      return { ...payload };
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
