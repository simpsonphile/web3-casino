import { formatEther } from "viem";
import { useReadCasinoGetBalance } from "../../../../Contract-hooks/generated";
import { Heading } from "@chakra-ui/react";

const Balance = () => {
  const { data } = useReadCasinoGetBalance();

  if (!data) return null;

  return (
    <Heading size="md">{Number(formatEther(data)).toFixed(5) + " ETH"}</Heading>
  );
};

export default Balance;
