import { http } from "wagmi";
import { hardhat, polygonMumbai } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";

const config = getDefaultConfig({
  appName: "Casino",
  projectId: "1", // todo
  chains: [hardhat, polygonMumbai],
  transports: {
    [hardhat.id]: http(),
    [polygonMumbai]: http(
      `https://polygon-mumbai.infura.io/v3/${import.meta.env.INFURA_API_KEY}`
    ),
  },
});

const DappProvider = ({ children }) => {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
};

export default DappProvider;
