import { Grid } from "@chakra-ui/react";
import Button from "../Button";
import KeyboardKey from "../KeyboardKey";
import { useKeyConfigStore } from "../../stores/keyConfigStore";

const Main = () => {
  const { keyConfig } = useKeyConfigStore();

  return (
    <div>
      <Grid gap={2}>
        <Button>
          Withdraw <KeyboardKey code={keyConfig?.get?.()?.atm?.withdraw?.[0]} />
        </Button>
        <Button>
          Deposit <KeyboardKey code={keyConfig?.get?.()?.atm?.deposit?.[0]} />
        </Button>
        <Button variant="subtle">
          Exit <KeyboardKey code={keyConfig?.get?.()?.atm?.exit?.[0]} />
        </Button>
      </Grid>
    </div>
  );
};

export default Main;
