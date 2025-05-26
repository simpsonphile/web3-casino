import styles from "./index.module.scss";
import { Heading } from "@chakra-ui/react";
import Points from "./Points";
import { useBlackjackStore } from "../stores/blackjackStore";

const ResultScreen = () => {
  const { result } = useBlackjackStore();

  const getMessage = () => {
    if (result === "win") return "You won";
    if (result === "win-early") return "You won early";
    if (result === "lose") return "You lost";

    return "";
  };
  return (
    <div className={styles.ResultScreen}>
      <Heading size="xl" color="white" textAlign="center">
        {getMessage()}
      </Heading>

      <Points />
    </div>
  );
};

export default ResultScreen;
