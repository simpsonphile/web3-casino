import { useEffect } from "react";
import { Heading } from "@chakra-ui/react";
import styles from "./index.module.scss";
import { useBlackjackStore } from "../stores/blackjackStore";

const NewPlayerJoined = () => {
  const { newPlayer, newPlayerJoined } = useBlackjackStore();

  useEffect(() => {
    setTimeout(() => {
      newPlayerJoined(null);
    }, 2500);
  }, [newPlayer]);

  if (newPlayer) {
    return (
      <div className={styles.NewPlayerJoined}>
        <Heading color="white" size="lg" textAlign="center">
          {newPlayer} joined the game!
        </Heading>
      </div>
    );
  }
};

export default NewPlayerJoined;
