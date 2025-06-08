import { useAccount, useBalance } from "wagmi";
import { useEffect, useRef, useState } from "react";
import {
  useReadCasinoNativeToChipRate,
  useWriteCasinoDeposit,
} from "../../../../Contract-hooks/generated";
import { formatEther, parseEther } from "viem";
import { Grid, GridItem } from "@chakra-ui/react";
import Button from "../Button";
import KeyboardKey from "../KeyboardKey";
import { useKeyConfigStore } from "../../stores/keyConfigStore";
import InputWithCurrency from "../InputWithCurrency";
import InputToken from "../InputToken";

const Deposit = () => {
  const inputRef = useRef();
  const { keyConfig } = useKeyConfigStore();
  const keys = keyConfig.get().atm;
  const [value, setValue] = useState("0");
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { data: rate } = useReadCasinoNativeToChipRate();

  const { writeContract } = useWriteCasinoDeposit();

  const send = () => {
    console.log("we should send");
    writeContract({ value: parseEther(value) });
  };

  useEffect(() => {
    const method = (e) => {
      console.log(e, value);
      if (e.key === keys.accept && value) send();
    };

    document.addEventListener("keyup", method);

    return () => document.removeEventListener("keyup", method);
  }, []);

  useEffect(() => {
    if (document.activeElement === inputRef.current) {
      inputRef.current?.focus();
    }
  }, [inputRef.current]);

  return (
    <Grid gap={2}>
      <GridItem colSpan="2">
        {/* <NumericKeypad
          max={formatEther(data.value)}
          value={value}
          onChange={setValue}
          onEnter={send}
        /> */}
        <InputWithCurrency
          ref={inputRef}
          value={value}
          onChange={setValue}
          max={formatEther(balance.value)}
        />
        <InputToken value={value / formatEther(rate)} />
      </GridItem>

      <Button variant="subtle">
        Exit <KeyboardKey code={keys.exit?.[0]} />
      </Button>

      <Button>
        Ok <KeyboardKey code={keys.accept?.[0]} />
      </Button>
    </Grid>
  );
};

export default Deposit;
