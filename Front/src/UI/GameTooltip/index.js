import { useEffect, useState } from "react";
import styles from "./index.module.scss";

const GameTooltip = () => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipText, setTooltipText] = useState("");

  useEffect(() => {
    window.showTooltip = (txt) => {
      setTooltipText(txt);
      setTooltipVisible(true);
    };

    window.hideTooltip = () => {
      setTooltipText("");
      setTooltipVisible(true);
    };

    return () => {
      window.showTooltip = undefined;
      window.hideTooltip = undefined;
    };
  }, []);

  if (!tooltipText || !tooltipVisible) return null;

  return <div className={styles.GameTooltip}>{tooltipText}</div>;
};

export default GameTooltip;
