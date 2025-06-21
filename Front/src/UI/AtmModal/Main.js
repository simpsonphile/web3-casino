import { Grid, Heading } from "@chakra-ui/react";
import Button from "../Button";
import KeyboardKey from "../KeyboardKey";
import { useKeyConfigStore } from "../../stores/keyConfigStore";
import Paragraph from "../Paragraph";

const Main = () => {
  const { keyConfig } = useKeyConfigStore();

  return (
    <div>
      <Grid gap={2}>
        <Heading>Casino Kiosk</Heading>
        <Paragraph>Please select an option below</Paragraph>
        <Button>
          Cash Out <KeyboardKey code={keyConfig?.get?.()?.atm?.withdraw?.[0]} />
        </Button>
        <Button>
          Buy Tokens{" "}
          <KeyboardKey code={keyConfig?.get?.()?.atm?.deposit?.[0]} />
        </Button>
        <Button variant="subtle">
          Exit <KeyboardKey code={keyConfig?.get?.()?.atm?.exit?.[0]} />
        </Button>
      </Grid>
    </div>
  );
};

export default Main;
