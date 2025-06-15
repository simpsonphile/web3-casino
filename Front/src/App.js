import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import TextManager from "@Common/TextManager";
import SoundPlayer from "@Common/SoundPlayer";
import RainbowKitProvider from "./context/RainbowKitProvider";
import DappProvider from "./context/DappProvider";
import { UserProvider } from "./context/UserContext";
import AppContent from "./AppContent";
import { Toaster } from "./UI/toaster";
import { useEffect, useState } from "react";
import CommandManager from "@Game/CommandManager";
import { initStoreRegistry } from "./stores/storeRegistry";

const queryClient = new QueryClient();

function App() {
  const [isStoreRegistryInit, setIsStoreRegistryInit] = useState(false);

  useEffect(() => {
    initStoreRegistry();
    setIsStoreRegistryInit(true);
  }, []);

  useEffect(() => {
    const textManager = new TextManager();

    window.textManager = textManager;
    window.t = window.textManager.get.bind(window.textManager);
  }, []);

  useEffect(() => {
    if (!isStoreRegistryInit) return;
    const soundPlayer = new SoundPlayer();
    soundPlayer.loadSounds();
    window.soundPlayer = soundPlayer;
  }, [isStoreRegistryInit]);

  useEffect(() => {
    const commandManager = new CommandManager();

    window.commandManager = commandManager;
  }, []);

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
