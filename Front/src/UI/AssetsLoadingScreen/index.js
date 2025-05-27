import { Heading } from "@chakra-ui/react";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useProgressStore } from "../../stores/progressStore";
import styles from "./index.module.scss";

const AssetsLoadingScreen = () => {
  const { progress, isLoading } = useProgressStore();

  if (!isLoading) return null;

  return (
    <div className={styles.AssetsLoadingScreen}>
      <Heading>Loading assets...</Heading>
      <ProgressBar progress={progress} />
    </div>
  );
};

export default AssetsLoadingScreen;
