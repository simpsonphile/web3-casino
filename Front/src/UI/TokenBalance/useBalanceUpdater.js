import {
  useWatchCasinoBalanceAddedEvent,
  useWatchCasinoBalanceRemovedEvent,
} from "@Contract-hooks/generated";

const useBalanceUpdater = (refetch) => {
  useWatchCasinoBalanceAddedEvent({
    onLogs: () => {
      refetch();
    },
    fromBlock: BigInt(0),
  });

  useWatchCasinoBalanceRemovedEvent({
    onLogs: () => {
      refetch();
    },
    fromBlock: BigInt(0),
  });
};

export default useBalanceUpdater;
