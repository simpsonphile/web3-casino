import { Heading, HStack } from "@chakra-ui/react";
import styles from "./index.module.scss";
import KeyboardKey from "../UI/KeyboardKey";

const BetScreen = () => {
  return (
    <div className={styles.BetScreen}>
      <Heading size="xl" color="white" textAlign="center">
        Place Your Bet
      </Heading>

      <HStack gap={2}>
        <div>
          <Heading size="md">2x</Heading>
          <KeyboardKey code="KeyD"></KeyboardKey>
        </div>

        <div>
          <Heading size="md">+1</Heading>
          <KeyboardKey code="Digit1"></KeyboardKey>
        </div>
        <div>
          <Heading size="md">+2</Heading>
          <KeyboardKey code="Digit2"></KeyboardKey>
        </div>
        <div>
          <Heading size="md">+5</Heading>
          <KeyboardKey code="Digit3"></KeyboardKey>
        </div>
        <div>
          <Heading size="md">+10</Heading>
          <KeyboardKey code="Digit4"></KeyboardKey>
        </div>
        <div>
          <Heading size="md">+25</Heading>
          <KeyboardKey code="Digit5"></KeyboardKey>
        </div>
        <div>
          <Heading size="md">+50</Heading>
          <KeyboardKey code="Digit6"></KeyboardKey>
        </div>
        <div>
          <Heading size="md">+100</Heading>
          <KeyboardKey code="Digit7"></KeyboardKey>
        </div>
        <div>
          <Heading size="md">+500</Heading>
          <KeyboardKey code="Digit8"></KeyboardKey>
        </div>

        <div>
          <Heading size="md">1/2</Heading>
          <KeyboardKey code="KeyH"></KeyboardKey>
        </div>

        <div>
          <Heading size="md">Accept</Heading>
          <KeyboardKey code="Enter"></KeyboardKey>
        </div>
      </HStack>
    </div>
  );
};

export default BetScreen;
