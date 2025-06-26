import { useEffect, useState } from "react";
import {
  useReadCasinoGetBalance,
  useReadCasinoNativeToChipRate,
  useWriteCasinoWithdraw,
} from "../../../../Contract-hooks/generated";
import { parseEther, formatEther } from "viem";
import { Field, Grid, GridItem } from "@chakra-ui/react";

import { toaster } from "../toaster";
import InputToken from "../InputToken";
import InputWithCurrency from "../InputWithCurrency";
import useKeyPress from "./useKeyPress";
import Footer from "./Footer";

const Withdraw = () => {
  const [value, setValue] = useState("0");
  const { data: balance } = useReadCasinoGetBalance();
  const { data: rate } = useReadCasinoNativeToChipRate();
  const isLoaded = typeof balance === "bigint" && typeof rate === "bigint";

  const { writeContract, isSuccess } = useWriteCasinoWithdraw();
  const send = () => writeContract({ args: [parseEther(value, "0")] });

  useEffect(() => {
    if (isSuccess) {
      toaster.create({
        type: "success",
        title: "Success",
        description: "funds withdrawn to your wallet",
      });
    }
  }, [isSuccess]);

  useKeyPress({
    value,
    onEnter: send,
    onChange: setValue,
    max: formatEther(balance),
    hasDecimals: false,
  });

  if (!isLoaded) return null;
  const valueInCurrency = value * Number(formatEther(rate));

  return (
    <Grid gap={2}>
      <GridItem>
        <Field.Root>
          <Field.Label>You give (max: {formatEther(balance)})</Field.Label>
          <InputToken value={value} readOnly></InputToken>
        </Field.Root>
      </GridItem>

      <GridItem>
        <Field.Root>
          <Field.Label>You get</Field.Label>
          <InputWithCurrency value={valueInCurrency} readOnly />
        </Field.Root>
      </GridItem>

      <GridItem>
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default Withdraw;
