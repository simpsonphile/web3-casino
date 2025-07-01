import { useEffect, useState } from "react";
import styles from "./index.module.scss";

const GameTooltip = () => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipText, setTooltipText] = useState("");

  useEffect(() => {
    window.showTooltip = (text) => {
      if (!text) return;

      setTooltipText(text);
      setTooltipVisible(true);
    };

    window.hideTooltip = () => {
      setTooltipVisible(false);
    };

    return () => {
      window.showTooltip = undefined;
      window.hideTooltip = undefined;
    };
  }, []);

  const isVisible = tooltipVisible && !!tooltipText;
  const classes = [
    styles.GameTooltip,
    isVisible ? styles.GameTooltipVisible : "",
  ].join(" ");

  return <div className={classes}>{tooltipText}</div>;
};

export default GameTooltip;
