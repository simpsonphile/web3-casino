import { Heading } from "@chakra-ui/react";
import styles from "./index.module.scss";

const WaitScreen = () => {
  return (
    <div className={styles.WaitScreen}>
      <Heading>Wait for next game</Heading>
    </div>
  );
};

export default WaitScreen;
