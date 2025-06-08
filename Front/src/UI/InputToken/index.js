import { Input, InputGroup } from "@chakra-ui/react";
import CasinoChip from "../CasinoChip";

const InputToken = (props) => {
  return (
    <InputGroup
      startAddon={<CasinoChip size="xs" color="red" hasValue={false} />}
    >
      <Input {...props} />
    </InputGroup>
  );
};

export default InputToken;
