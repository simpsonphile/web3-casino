import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import RainbowKitProvider from "./context/RainbowKitProvider";
import DappProvider from "./context/DappProvider";
import AppContent from "./AppContent";
import { Toaster } from "./UI/toaster";
import { useServiceLoader } from "./services/useServiceLoader";

const queryClient = new QueryClient();

function App() {
  const isServicesLoaded = useServiceLoader();

  if (!isServicesLoaded) return null;

  return (
    <DappProvider>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ChakraProvider value={defaultSystem}>
            <AppContent />
            <Toaster />
          </ChakraProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </DappProvider>
  );
}

export default App;
