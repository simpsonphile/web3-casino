import styles from "./index.module.scss";

const keyMap = {
  KeyW: "w",
  KeyW: "w",
  KeyW: "w",
  KeyW: "w",
};

const KeyboardKey = ({ code }) => {
  let value;
  if (!code) return null;
  if (code.includes("Key")) value = code.split("Key")[1].toLowerCase();
  else value = code;
  return <span className={styles.KeyboardKey}>{value}</span>;
};

export default KeyboardKey;
