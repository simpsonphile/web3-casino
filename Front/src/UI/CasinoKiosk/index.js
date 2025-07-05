import Modal from "../Modal";
import Main from "./Main";

import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import { useAtmStore } from "../../stores/atmStore";
import { Heading } from "@chakra-ui/react";
import DepositHistory from "./DepositHistory";

const AtmModal = () => {
  const { isVisible, step } = useAtmStore();

  const getModalTitle = () => {
    switch (step) {
      case "main":
      default:
        return "Casino Kiosk";
      case "deposit":
        return "Buy Tokens";
      case "withdraw":
        return "Cash Out";
      case "history":
        return "History";
    }
  };

  const getModalContent = () => {
    switch (step) {
      case "main":
      default:
        return <AtmModal.Main />;
      case "deposit":
        return <Deposit />;
      case "withdraw":
        return <Withdraw />;
      case "history":
        return <DepositHistory />;
    }
  };

  return (
    <Modal isOpen={isVisible} hasCloseInFooter={false} hasCloseInHeader={false}>
      <Heading>{getModalTitle()}</Heading>
      {getModalContent()}
    </Modal>
  );
};

AtmModal.Main = Main;

export default AtmModal;
