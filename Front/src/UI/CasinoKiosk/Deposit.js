import { useAccount, useBalance } from "wagmi";
import { useEffect, useState } from "react";
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
import { toaster } from "../toaster";

const Deposit = () => {
  const [value, setValue] = useState("0");
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { data: rate } = useReadCasinoNativeToChipRate();

  const isLoaded =
    typeof balance.value === "bigint" && typeof rate === "bigint";
  const max = isLoaded ? formatEther(balance.value * rate) : 0;

  const { writeContract, isSuccess, isError, error } = useWriteCasinoDeposit();

  const send = () => {
    if (isLoaded) {
      writeContract({ value: parseEther(value) / rate });
    }
  };

  useKeyPress({ value, onChange: setValue, onEnter: send, max });

  useEffect(() => {
    if (isSuccess) {
      toaster.create({
        type: "success",
        title: "Success",
        description: "funds deposited to your casino account",
      });
      setValue("0");
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError) {
      toaster.create({
        type: "error",
        title: "Error",
        description: error,
      });
    }
  }, [isError]);

  if (!isLoaded) return null;

  return (
    <Grid gap={2}>
      <GridItem>
        <Field.Root>
          <Field.Label>You get</Field.Label>
          <InputToken value={value} readOnly />
        </Field.Root>
      </GridItem>

      <GridItem>
        <Field.Root>
          <Field.Label>
            You give (max: {formatEther(balance.value)})
          </Field.Label>
          <InputWithCurrency value={value / Number(rate)} readOnly />
        </Field.Root>
      </GridItem>

      <GridItem>
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default Deposit;
