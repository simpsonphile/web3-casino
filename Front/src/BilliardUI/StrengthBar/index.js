import React from "react";
import styles from "./index.module.scss";

const StrengthBar = ({ strength = 0 }) => {
  const clampedStrength = Math.min(Math.max(strength, 0), 1);

  return (
    <div className={styles.strengthBarContainer}>
      <div
        className={styles.strengthBarFill}
        style={{ "--strength": clampedStrength }}
      />
    </div>
  );
};

export default StrengthBar;
