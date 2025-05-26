import NumericKeypad from "./NumericKeypad";
import { useState } from "react";
import {
  useReadCasinoGetBalance,
  useWriteCasinoWithdraw,
} from "../../../../Contract-hooks/generated";
import { parseEther, formatEther } from "viem";
import { Grid, GridItem } from "@chakra-ui/react";
import Button from "../Button";
import KeyboardKey from "../KeyboardKey";
import { useKeyConfigStore } from "../../stores/keyConfigStore";

const Withdraw = () => {
  const { keyConfig } = useKeyConfigStore();

  const [value, setValue] = useState("0");

  const { data } = useReadCasinoGetBalance();

  const { writeContract } = useWriteCasinoWithdraw();

  const send = () => writeContract({ args: [parseEther(value, "0")] });

  return (
    <Grid gap={2}>
      <GridItem colSpan="2">
        <NumericKeypad
          max={data ? formatEther(data) : 0}
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

export default Withdraw;
