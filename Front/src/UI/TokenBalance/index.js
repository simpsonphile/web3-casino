import { formatEther } from "viem";
import CasinoChip from "../CasinoChip";
import style from "./index.module.scss";
import useBalance from "./useBalance";

const TokenBalance = () => {
  const data = useBalance();

  if (typeof data !== "bigint") return null;

  return (
    <div className={style.TokenBalance}>
      <CasinoChip color="red" size="xs" hasValue={false} />
      {Number(formatEther(data))}
    </div>
  );
};

export default TokenBalance;
