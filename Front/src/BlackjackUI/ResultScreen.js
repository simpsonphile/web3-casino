import { useBlackjackUIContext } from "../context/BlackjackUIContext";
import styles from "./index.module.scss";
import { Heading } from "@chakra-ui/react";

const ResultScreen = () => {
  const { data } = useBlackjackUIContext();

  const getMessage = () => {
    if (data.result === "win") return "You won";
    if (data.result === "lose") return "You lost";

    return "";
  };
  return (
    <div className={styles.ResultScreen}>
      <Heading size="xl" color="white" textAlign="center">
        {getMessage()}
      </Heading>
    </div>
  );
};

export default ResultScreen;
