import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { config } from "./dappConfig";
import AppContent from "./AppContent";
import { UserProvider } from "./context/UserContext";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Toaster } from "./UI/toaster";

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <UserProvider>
            <ChakraProvider value={defaultSystem}>
              <AppContent />
              <Toaster />
            </ChakraProvider>
          </UserProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
