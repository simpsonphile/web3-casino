import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import RainbowKitProvider from "./context/RainbowKitProvider";
import DappProvider from "./context/DappProvider";
import { UserProvider } from "./context/UserContext";
import AppContent from "./AppContent";
import { Toaster } from "./UI/toaster";

const queryClient = new QueryClient();

function App() {
  return (
    <DappProvider>
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
    </DappProvider>
  );
}

export default App;
