import { useEffect, useState } from "react";
import Modal from "../Modal";
import Main from "./Main";

import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Balance from "../Balance";
import { VStack } from "@chakra-ui/react";

const AtmModal = ({ isOpen, setIsOpen }) => {
  const [step, setStep] = useState("main");

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

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.code === "KeyE") {
        if (step == "main") setIsOpen(false);
        else setStep("main");
      } else if (step === "main") {
        if (e.code === "KeyD") {
          setStep("deposit");
        } else if (e.code === "KeyW") setStep("withdraw");
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [step]);

  return (
    <Modal
      title={getModalTitle()}
      isOpen={isOpen}
      hasCloseInFooter={false}
      hasCloseInHeader={false}
    >
      <VStack gap={3}>
        <div>
          Your deposit is currently <Balance />
        </div>
        {getModalContent()}
      </VStack>
    </Modal>
  );
};

AtmModal.Main = Main;

export default AtmModal;
