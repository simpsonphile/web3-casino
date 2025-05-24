import styles from "./index.module.scss";
import KeyboardKey from "../UI/KeyboardKey";
import { useSlotsStore } from "../stores/slotsStore";

const SlotsUI = () => {
  const { isVisible } = useSlotsStore();

  if (!isVisible) return null;

  return (
    <div className={styles.slotsUI}>
      <div className={styles.slotsUI__title}>
        <h1>Slots Game</h1>
      </div>
      <div className={styles.slotsUI__controls}>
        <div className={styles.slotsUI__controls__button}>
          <KeyboardKey code="s" />
          <span>Spin</span>
        </div>
        <div className={styles.slotsUI__controls__button}>
          <KeyboardKey code="ArrowUp" />
          <span>Increase Bet</span>
        </div>
        <div className={styles.slotsUI__controls__button}>
          <KeyboardKey code="ArrowDown" />
          <span>Decrease Bet</span>
        </div>
      </div>
    </div>
  );
};
export default SlotsUI;
