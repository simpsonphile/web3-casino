import { defineConfig } from "../node_modules/@wagmi/cli/dist/esm/exports/index.js";
// import {
//   hardhat,
//   react,
// } from "../node_modules/@wagmi/cli/dist/types/exports/plugins/index";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { hardhat } from "../node_modules/@wagmi/cli/dist/esm/plugins/hardhat.js";
import { react } from "../node_modules/@wagmi/cli/dist/esm/plugins/react.js";

import deployedAddresses from "../Contracts/ignition/deployments/chain-31337/deployed_addresses.json";

const deployments = Object.fromEntries(
  Object.entries(deployedAddresses).map(([name, address]) => [
    name.split("#")[1],
    { 31337: address },
  ])
);

export default defineConfig({
  out: "generated.ts",
  contracts: [],
  plugins: [
    react(),
    hardhat({
      project: "../Contracts",
      deployments: deployments,

      // artifacts:
      // deployments
    }),
  ],
});
