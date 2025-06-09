import "@rainbow-me/rainbowkit/styles.css";
import { darkTheme, RainbowKitProvider as RKP } from "@rainbow-me/rainbowkit";

const RainbowKitProvider = ({ children }) => {
  return (
    <RKP
      theme={darkTheme({
        accentColor: "#009D6B",
        borderRadius: "small",
      })}
    >
      {children}
    </RKP>
  );
};

export default RainbowKitProvider;
