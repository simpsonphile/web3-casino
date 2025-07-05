import { formatEther } from "viem";
import { useReadCasinoGetBalance } from "../../../../Contract-hooks/generated";
import CasinoChip from "../CasinoChip";
import style from "./index.module.scss";

import useBalanceUpdater from "./useBalanceUpdater";

// make guest having tokens too
const TokenBalance = () => {
  const { data, refetch } = useReadCasinoGetBalance();

  useBalanceUpdater(refetch);

  if (typeof data !== "bigint") return null;
  return (
    <div className={style.TokenBalance}>
      <CasinoChip color="red" size="xs" hasValue={false} />
      {Number(formatEther(data))}
    </div>
  );
};

export default TokenBalance;
