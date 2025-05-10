import { useEffect } from "react";
import { useBlackjackUIContext } from "../context/BlackjackUIContext";
import { Heading } from "@chakra-ui/react";
import styles from "./index.module.scss";

const NewPlayerJoined = () => {
  const { state, dispatch } = useBlackjackUIContext();
  const { newPlayer } = state;

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "newPlayerJoined", payload: null });
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
