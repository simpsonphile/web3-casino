import styles from "./index.module.scss";

const GameTooltip = ({ children }) => {
  return <div className={styles.GameTooltip}>{children}</div>;
};

export default GameTooltip;
