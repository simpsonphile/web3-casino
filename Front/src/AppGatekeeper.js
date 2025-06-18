import { useEffect, useState } from "react";
import { Spinner, Text, Button } from "@chakra-ui/react";
import { ping } from "./api";
import CenteredLayout from "./Layouts/CenteredLayout";

const AppGatekeeper = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showWaitingScreen, setShowWaitingScreen] = useState(false);

  const checkBackend = async () => {
    try {
      await ping();
      setIsReady(true);
    } catch (err) {
      console.error("Ping failed:", err);
      setHasError(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShowWaitingScreen(true);
    }, 2000);
    checkBackend();
  }, []);

  if (hasError) {
    return (
      <CenteredLayout>
        <Text fontSize="lg" fontWeight="semibold">
          ⚠️ Server is not responding
        </Text>
        <Text color="gray.500">
          This may happen if the server is waking up. Try again shortly.
        </Text>
        <Button onClick={checkBackend} colorScheme="blue">
          Retry
        </Button>
      </CenteredLayout>
    );
  }

  if (!isReady && showWaitingScreen) {
    return (
      <CenteredLayout>
        <Spinner size="xl" color="green.500" />
        <Text color="gray.600" textAlign="center">
          Waking up the server... <br />
          This may take up to 50 seconds.
        </Text>
      </CenteredLayout>
    );
  }

  if (!isReady && !showWaitingScreen) return null;

  return children;
};

export default AppGatekeeper;
