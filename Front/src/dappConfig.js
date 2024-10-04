import { http } from "wagmi";
import { hardhat } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

export const config = getDefaultConfig({
  appName: "Casino",
  projectId: "1", // todo
  chains: [hardhat],
  transports: {
    [hardhat.id]: http(),
  },
});
