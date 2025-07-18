import { useAccount, useBalance } from "wagmi";
import { useState } from "react";
import {
  useReadCasinoNativeToChipRate,
  useWriteCasinoDeposit,
} from "../../../../Contract-hooks/generated";
import { formatEther, parseEther } from "viem";
import { Field, Grid, GridItem } from "@chakra-ui/react";
import InputWithCurrency from "../InputWithCurrency";
import InputToken from "../InputToken";
import useKeyPress from "./useKeyPress";
import Footer from "./Footer";

const Deposit = () => {
  const [value, setValue] = useState("0");
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { data: rate } = useReadCasinoNativeToChipRate();
  const max = balance.value ? formatEther(balance.value) : 0;

  const isLoaded =
    typeof balance.value === "bigint" && typeof rate === "bigint";

  const { writeContract } = useWriteCasinoDeposit();

  const send = () => {
    console.log("we should send", parseEther(value));
    writeContract({ value: parseEther(value) });
  };

  useKeyPress({ value, onChange: setValue, onEnter: send, max });

  if (!isLoaded) return null;

  return (
    <Grid gap={2}>
      <GridItem>
        <Field.Root>
          <Field.Label>
            You give (max: {formatEther(balance.value)})
          </Field.Label>
          <InputWithCurrency
            value={value}
            max={formatEther(balance.value)}
            readOnly
          />
        </Field.Root>
      </GridItem>

      <GridItem>
        <Field.Root>
          <Field.Label>You get</Field.Label>
          <InputToken value={value / formatEther(rate)} readOnly />
        </Field.Root>
      </GridItem>

      <GridItem>
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default Deposit;
