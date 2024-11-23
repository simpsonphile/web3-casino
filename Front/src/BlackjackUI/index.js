import BetScreen from "./BetScreen";
import WaitScreen from "./WaitScreen";
import HitScreen from "./HitScreen";
import ResultScreen from "./ResultScreen";
import styles from "./index.module.scss";
import { useBlackjackUIContext } from "../context/BlackjackUIContext";
import NewPlayerJoined from "./NewPlayerJoined";
import { Box } from "@chakra-ui/react";

const BlackjackUI = () => {
  const { state } = useBlackjackUIContext();
  const { isVisible, step } = state;

  if (!isVisible) return null;

  const content = () => {
    switch (step) {
      case "wait":
        return <WaitScreen />;
      case "bet":
        return <BetScreen />;
      case "hit":
        return <HitScreen />;
      case "result":
        return <ResultScreen />;
      default:
        return null;
    }
  };

  return (
    <Box gap={4} className={styles.BlackjackUI}>
      {content()}
      <NewPlayerJoined />
    </Box>
  );
};

export default BlackjackUI;
