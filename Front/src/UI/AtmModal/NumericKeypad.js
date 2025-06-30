import { Grid, GridItem, Input, InputGroup } from "@chakra-ui/react";
import { useEffect } from "react";
import CasinoChip from "../CasinoChip";

const NumericKeypad = ({ value, onChange, onEnter, max, isWithdraw }) => {
  useEffect(() => {
    const onKeyDown = (e) => {
      let x = -1;

      if (e.code === "Enter") {
        onEnter();
        return;
      } else if (e.code.includes("Digit")) x = Number(e.code.split("Digit")[1]);
      else if (e.code.includes("Backspace")) x = "b";

      if (x === -1) return;

      if (typeof x === "number") {
        onChange((prev) => {
          if (prev === "0") return x + "";

          if (Number(prev + x) > Number(max)) return parseInt(max).toString();

          return prev + x;
        });
      }

      if (x === "b")
        onChange((prev) => {
          const x = prev.split("");
          x.pop();
          if (x.length > 0) {
            return x.join("");
          }

          return "0";
        });
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [value]);

  const tokenInput = (
    <InputGroup
      startAddon={<CasinoChip size="xs" color="red" hasValue={false} />}
    >
      <Input value={value} max={max} />
    </InputGroup>
  );

  const nativeTokenInput = (
    <InputGroup startAddon="ETH">
      <Input value={value / 10000} max={max / 10000} />
    </InputGroup>
  );

  return (
    <Grid gap={2} templateColumns="repeat(3, 1fr)">
      <GridItem colSpan={3}>
        you send:
        {isWithdraw ? tokenInput : nativeTokenInput}
      </GridItem>
      <GridItem colSpan={3}>
        and get:
        {isWithdraw ? nativeTokenInput : tokenInput}
      </GridItem>
    </Grid>
  );
};

export default NumericKeypad;
