import PayoutsTable from "./PayoutTable";
import InputGuide from "./InputGuide";
import { Heading } from "@chakra-ui/react";
import styles from "./index.module.scss";
import KeyboardKey from "../UI/KeyboardKey";
const Help = () => {
  return (
    <div>
      <Heading size="xl" color="white" textAlign="center" mb={2}>
        Help
      </Heading>
      <InputGuide />
      <PayoutsTable />
      <div className={styles.slotsUIControlsButton}>
        <KeyboardKey code="KeyB" />
        <span>Go back</span>
      </div>
    </div>
  );
};

export default Help;
