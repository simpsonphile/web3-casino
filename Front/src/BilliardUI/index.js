import { useBilliardStore } from "@Front/stores/billiardStore";
import styles from "./index.module.scss";
import YourTurnStep from "./YourTurnStep";
import CueBallPlacementStep from "./CueBallPlacementStep";
import GameOverStep from "./GameOverStep";

const BilliardUI = () => {
  const { isVisible, step } = useBilliardStore();

  if (!isVisible) return null;

  switch (step) {
    case "yourTurn":
      return <YourTurnStep />;
    case "opponentTurn":
      return <OpponentTurn />;
    case "cuePlacement":
      return <CueBallPlacementStep />;
    case "gameOver":
      return <GameOverStep />;
  }
  return <div className={styles.BilliardUI}></div>;
};
export default BilliardUI;
