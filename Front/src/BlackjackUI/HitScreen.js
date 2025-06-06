import styles from "./index.module.scss";
import KeyboardKey from "../UI/KeyboardKey";
import { Heading, HStack, Box } from "@chakra-ui/react";
import Points from "./Points";
import { useBlackjackStore } from "../stores/blackjackStore";
import { useKeyConfigStore } from "../stores/keyConfigStore";

const HitScreen = () => {
  const { cards, turn, id, hasStand, playerState } = useBlackjackStore();
  const { keyConfig } = useKeyConfigStore();

  const blackjackKeys = keyConfig.get().blackjack;

  const isDoubleVisible = cards.length === 2 && !hasStand;

  if (turn === id) {
    return (
      <div className={styles.HitScreen}>
        <Points />
        <HStack gap={3} textAlign="center">
          {isDoubleVisible && (
            <Box>
              <Heading size="lg" color="white">
                Double
              </Heading>
              <KeyboardKey code={blackjackKeys.double[0]}></KeyboardKey>
            </Box>
          )}
          <Box>
            <Heading size="lg" color="white">
              Hit
            </Heading>
            <KeyboardKey code={blackjackKeys.hit[0]}></KeyboardKey>
          </Box>
          <Box>
            <Heading size="lg" color="white">
              Stand
            </Heading>
            <KeyboardKey code={blackjackKeys.stand[0]}></KeyboardKey>
          </Box>
        </HStack>
      </div>
    );
  }

  let title;

  if (playerState === "lose") {
    title = "You lost";
  } else if (playerState === "win") {
    title = "You win";
  } else if (playerState === "win-early") {
    title = "You win early";
  } else if (hasStand || playerState === "stand") {
    title = "You stay";
  } else {
    title = "Wait for your turn";
  }

  return (
    <div className={styles.HitScreen}>
      <Heading size="xl" color="white" textAlign="center">
        {title}
      </Heading>
      <Points />
    </div>
  );
};

export default HitScreen;
