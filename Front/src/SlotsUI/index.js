import { useSlotsStore } from "../stores/slotsStore";
import BetScreen from "./BetScreen";
import Help from "./Help";
import styles from "./index.module.scss";

const SlotsUI = () => {
  const { isVisible, step, bet } = useSlotsStore();

  if (!isVisible) return null;

  const content = () => {
    if (step === "help") return <Help />;

    if (step === "main") return <BetScreen />;
  };

  return <div className={styles.slotsUI}>{content()}</div>;
};
export default SlotsUI;
