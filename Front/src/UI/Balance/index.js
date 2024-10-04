import { formatEther } from "viem";
import { useReadCasinoGetBalance } from "../../../../Contract-hooks/generated";

const Balance = () => {
  const { data } = useReadCasinoGetBalance();

  if (data) {
    return formatEther(data);
  }

  return 0;
};

export default Balance;
