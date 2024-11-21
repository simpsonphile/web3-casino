import BetScreen from "./BetScreen";
import WaitScreen from "./WaitScreen";
import HitScreen from "./HitScreen";
import ResultScreen from "./ResultScreen";
import styles from "./index.module.scss";
import { useBlackjackUIContext } from "../context/BlackjackUIContext";

const BlackjackUI = () => {
  const { isVisible, step } = useBlackjackUIContext();

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

  return <div className={styles.BlackjackUI}>{content()}</div>;
};

export default BlackjackUI;
