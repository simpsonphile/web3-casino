import BetScreen from "./BetScreen";
import WaitScreen from "./WaitScreen";
import HitScreen from "./HitScreen";
import { useState } from "react";
import styles from "./index.module.scss";

const BlackjackUI = ({ step }) => {
  const content = () => {
    switch (step) {
      case "wait":
        return <WaitScreen />;
      case "bet":
        return <BetScreen />;
      case "hit":
        return <HitScreen />;
      default:
        return null;
    }
  };

  return <div className={styles.BlackjackUI}>{content()}</div>;
};

export default BlackjackUI;
