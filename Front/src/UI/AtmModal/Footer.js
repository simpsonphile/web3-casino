import { ButtonGroup } from "@chakra-ui/react";
import Button from "../Button";
import KeyboardKey from "../KeyboardKey";
import { useKeyConfigStore } from "../../stores/keyConfigStore";

const Footer = () => {
  const { keyConfig } = useKeyConfigStore();
  const keys = keyConfig.get().atm;

  return (
    <ButtonGroup justifyItems="stretch">
      <Button variant="subtle">
        Exit <KeyboardKey code={keys.exit?.[0]} />
      </Button>

      <Button>
        Ok <KeyboardKey code={keys.accept?.[0]} />
      </Button>
    </ButtonGroup>
  );
};

export default Footer;
