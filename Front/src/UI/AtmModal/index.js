import Modal from "../Modal";
import Main from "./Main";

import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import { VStack } from "@chakra-ui/react";
import { useAtmStore } from "../../stores/atmStore";

const AtmModal = () => {
  const { isVisible, step } = useAtmStore();

  const getModalTitle = () => {
    switch (step) {
      case "main":
      default:
        return "Welcome Sraka";
      case "deposit":
        return "Deposit";
      case "withdraw":
        return "Withdraw";
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
    }
  };

  return (
    <Modal
      title={getModalTitle()}
      isOpen={isVisible}
      hasCloseInFooter={false}
      hasCloseInHeader={false}
    >
      <VStack gap={3}>{getModalContent()}</VStack>
    </Modal>
  );
};

AtmModal.Main = Main;

export default AtmModal;
