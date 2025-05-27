import styles from "./index.module.scss";

const ProgressBar = ({ progress }) => {
  const percent = Math.round(progress * 100);

  return (
    <div className={styles.ProgressBar}>
      <div className={styles.ProgressBarBar} style={{ width: `${percent}%` }}>
        {percent > 5 && (
          <span className={styles.ProgressBarLabel}>{percent}%</span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
