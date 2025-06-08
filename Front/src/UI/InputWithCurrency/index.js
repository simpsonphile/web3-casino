import { Input, InputGroup } from "@chakra-ui/react";
import { useChainId, useConfig } from "wagmi";

const InputWithCurrency = (props) => {
  const chainId = useChainId();
  const { chains } = useConfig();
  const chain = chains.find((c) => c.id === chainId);
  const nativeSymbol = chain.nativeCurrency.symbol;
  return (
    <InputGroup startAddon={nativeSymbol}>
      <Input {...props} />
    </InputGroup>
  );
};

export default InputWithCurrency;
