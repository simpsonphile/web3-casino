import { useSlotsStore } from "../stores/slotsStore";
import styles from "./index.module.scss";
import { Heading } from "@chakra-ui/react";
import KeyboardKey from "../UI/KeyboardKey";

const BetScreen = () => {
  const { bet } = useSlotsStore();

  return (
    <div className={styles.slotUIBetScreen}>
      <div className={styles.slotUIBalance}>
        <Heading size="xl" color="white" textAlign="center" mb={2}>
          <span>Balance: </span>
          <span></span>
        </Heading>
      </div>
      <div className={styles.slotUIBet}>
        <Heading size="xl" color="white" textAlign="center" mb={2}>
          <span>Bet: </span>
          <span>{bet}</span>
        </Heading>
      </div>

      <div className={styles.slotsUIControlsButton}>
        <Heading size="xl" color="white" textAlign="center" mb={2}>
          Help
        </Heading>
        <KeyboardKey code="h" />
      </div>
    </div>
  );
};

export default BetScreen;
