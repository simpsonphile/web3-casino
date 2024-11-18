import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { config } from "./dappConfig";
import AppContent from "./AppContent";
import { UserProvider } from "./context/UserContext";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { KeyConfigProvider } from "./context/KeyConfigContext";

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <UserProvider>
            <KeyConfigProvider>
              <ChakraProvider value={defaultSystem}>
                <AppContent />
              </ChakraProvider>
            </KeyConfigProvider>
          </UserProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
