import { useAccount, useBalance } from "wagmi";
import NumericKeypad from "./NumericKeypad";
import { useState } from "react";
import { useWriteCasinoDeposit } from "../../../../Contract-hooks/generated";
import { parseEther, formatEther } from "viem";
import { Grid, GridItem } from "@chakra-ui/react";
import Button from "../Button";
import KeyboardKey from "../KeyboardKey";
import { useKeyConfigContext } from "../../context/KeyConfigContext";

const Deposit = () => {
  const { keyConfig } = useKeyConfigContext();
  const [value, setValue] = useState("0");
  const { address } = useAccount();
  const { data } = useBalance({ address });

  const { writeContract } = useWriteCasinoDeposit();

  const send = () => {
    writeContract({ value: parseEther(value) });
  };

  return (
    <Grid gap={2}>
      <GridItem colSpan="2">
        <NumericKeypad
          max={formatEther(data.value)}
          value={value}
          onChange={setValue}
          onEnter={send}
        />
      </GridItem>

      <Button variant="subtle">
        Exit <KeyboardKey code={keyConfig?.get?.()?.atm?.exit?.[0]} />
      </Button>

      <Button>
        Ok <KeyboardKey code={keyConfig?.get?.()?.atm?.accept?.[0]} />
      </Button>
    </Grid>
  );
};

export default Deposit;
