import styles from "./index.module.scss";
import KeyboardKey from "../UI/KeyboardKey";

const HitScreen = () => {
  return (
    <div className={styles.HitScreen}>
      <KeyboardKey code="KeyD"></KeyboardKey>
      <KeyboardKey code="KeyH"></KeyboardKey>
      <KeyboardKey code="KeyS"></KeyboardKey>
    </div>
  );
};

export default HitScreen;
