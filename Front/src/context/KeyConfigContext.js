import { createContext, useContext, useEffect, useState } from "react";
import KeyConfig from "@Common/KeyConfig";

const KeyConfigContext = createContext();

export const useKeyConfigContext = () => useContext(KeyConfigContext);

export const KeyConfigProvider = ({ children }) => {
  const [keyConfig, setKeyConfig] = useState();

  useEffect(() => {
    setKeyConfig(new KeyConfig());
  }, []);

  return (
    <KeyConfigContext.Provider value={{ keyConfig }}>
      {children}
    </KeyConfigContext.Provider>
  );
};
