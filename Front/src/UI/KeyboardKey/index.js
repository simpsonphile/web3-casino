import styles from "./index.module.scss";

const KeyboardKey = ({ code }) => {
  let value;
  if (!code) return null;
  if (code.includes("Key")) value = code.split("Key")[1].toLowerCase();
  else if (code.includes("Digit")) value = code.split("Digit")[1].toLowerCase();
  else value = code;
  return <span className={styles.KeyboardKey}>{value}</span>;
};

export default KeyboardKey;
