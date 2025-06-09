import { http } from "wagmi";
import { hardhat } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";

const config = getDefaultConfig({
  appName: "Casino",
  projectId: "1", // todo
  chains: [hardhat],
  transports: {
    [hardhat.id]: http(),
  },
});

const DappProvider = ({ children }) => {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
};

export default DappProvider;
