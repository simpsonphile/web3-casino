import { Grid, GridItem, Input } from "@chakra-ui/react";
import Button from "../Button";
import { useEffect } from "react";

const NumericKeypad = ({ value, onChange, onEnter, max }) => {
  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "b"];

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
          console.log(prev + x, max);
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

  return (
    <Grid gap={2} templateColumns="repeat(3, 1fr)">
      <GridItem colSpan={3}>
        <Input value={value} max={max} />
      </GridItem>
      {keys.map((key) => (
        <Button>{key}</Button>
      ))}
    </Grid>
  );
};

export default NumericKeypad;
