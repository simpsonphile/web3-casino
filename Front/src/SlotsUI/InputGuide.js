import styles from "./index.module.scss";
import KeyboardKey from "../UI/KeyboardKey";
import { Heading } from "@chakra-ui/react";

const InputGuide = () => {
  return (
    <div className={styles.slotsUIControls}>
      <div className={styles.slotsUIControlsButton}>
        <Heading size="xl" color="white" textAlign="center" mb={2}>
          Spin
        </Heading>
        <KeyboardKey code="s" />
      </div>
      <div className={styles.slotsUIControlsButton}>
        <Heading size="xl" color="white" textAlign="center" mb={2}>
          Increase Bet
        </Heading>
        <KeyboardKey code="ArrowUp" />
      </div>
      <div className={styles.slotsUIControlsButton}>
        <Heading size="xl" color="white" textAlign="center" mb={2}>
          Decrease Bet
        </Heading>
        <KeyboardKey code="ArrowDown" />
      </div>
      <div className={styles.slotsUIControlsButton}>
        <Heading size="xl" color="white" textAlign="center" mb={2}>
          Close
        </Heading>
        <KeyboardKey code="e" />
      </div>
    </div>
  );
};

export default InputGuide;
