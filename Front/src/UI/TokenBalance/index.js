import { formatEther } from "viem";
import { useReadCasinoGetBalance } from "../../../../Contract-hooks/generated";
import CasinoChip from "../CasinoChip";
import style from "./index.module.scss";

// make guest having tokens too
const TokenBalance = () => {
  const { data } = useReadCasinoGetBalance();

  if (typeof data !== "bigint") return null;
  return (
    <div className={style.TokenBalance}>
      <CasinoChip color="red" size="xs" hasValue={false} />
      {Number(formatEther(data))}
    </div>
  );
};

export default TokenBalance;
