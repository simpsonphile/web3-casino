import { Heading } from "@chakra-ui/react";
import styles from "./index.module.scss";

const WaitScreen = () => {
  return (
    <div className={styles.WaitScreen}>
      <Heading size="xl" color="white" textAlign="center">
        Wait for next game
      </Heading>
    </div>
  );
};

export default WaitScreen;
