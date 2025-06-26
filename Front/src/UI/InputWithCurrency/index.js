import { Input, InputGroup } from "@chakra-ui/react";
import { forwardRef } from "react";
import { useChainId, useConfig } from "wagmi";

const InputWithCurrency = forwardRef((props, ref) => {
  const chainId = useChainId();
  const { chains } = useConfig();
  const chain = chains.find((c) => c.id === chainId);
  const nativeSymbol = chain.nativeCurrency.symbol;

  return (
    <InputGroup startAddon={nativeSymbol}>
      <Input {...props} ref={ref} />
    </InputGroup>
  );
});

export default InputWithCurrency;
