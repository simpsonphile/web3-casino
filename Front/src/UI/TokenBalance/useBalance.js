import { useReadCasinoGetBalance } from "@Contract-hooks/generated";
import { useUserStore } from "@Front/stores/userStore";
import { parseEther } from "ethers";
import { useEffect } from "react";

const useBalance = () => {
  const { asGuest, guestBalance, balanceRefreshKey } = useUserStore();
  const { data, refetch } = useReadCasinoGetBalance();

  useEffect(() => {
    refetch();
  }, [balanceRefreshKey]);

  if (asGuest) return parseEther(String(guestBalance));
  if (typeof data !== "bigint") return null;
  return data;
};

export default useBalance;
