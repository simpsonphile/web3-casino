import { useState } from "react";
import { Button, Input } from "@chakra-ui/react";
import { useWriteCasinoDeposit } from "../../../../Contract-hooks/generated";
import { parseEther } from "viem";
import Modal from "../Modal";

const Deposit = ({ isOpen, setIsOpen }) => {
  const { writeContract, status } = useWriteCasinoDeposit({});
  const [value, setValue] = useState("0");

  const onDeposit = () =>
    writeContract({
      value: parseEther(value || "0"),
    });

  return (
    <>
      <Modal
        title="Deposit"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        footerChildren={<Button onClick={onDeposit}>Deposit</Button>}
      >
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
      </Modal>
    </>
  );
};

export default Deposit;
