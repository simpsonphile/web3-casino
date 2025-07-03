import styles from "./index.module.scss";

import { getReadableKey } from "../../utils/keyboard";

const KeyboardKey = ({ code }) => {
  let value = getReadableKey(code);
  return (
    <span className={styles.KeyboardKey} data-keyboard-key={value}>
      {value}
    </span>
  );
};

export default KeyboardKey;
