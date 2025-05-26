import BetScreen from "./BetScreen";
import WaitScreen from "./WaitScreen";
import HitScreen from "./HitScreen";
import ResultScreen from "./ResultScreen";
import styles from "./index.module.scss";
import NewPlayerJoined from "./NewPlayerJoined";
import { Box } from "@chakra-ui/react";
import { useBlackjackStore } from "../stores/blackjackStore";

const BlackjackUI = () => {
  const { isVisible, step } = useBlackjackStore();

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
