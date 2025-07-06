import { useState } from "react";
import { useAccount } from "wagmi";
import {
  useWatchCasinoBalanceAddedEvent,
  useWatchCasinoBalanceRemovedEvent,
  useWatchCasinoDepositEvent,
  useWatchCasinoWithdrawEvent,
} from "@Contract-hooks/generated";
import { Box, Spinner } from "@chakra-ui/react";
import Table from "./Table";

const TransactionHistory = () => {
  const { address } = useAccount();
  const [eventMap, setEventMap] = useState(new Map());

  const handleNewLogs = (logs) => {
    setEventMap((prev) => {
      const updated = new Map(prev);
      logs.forEach((log) => {
        const key = `${log.transactionHash}-${log.logIndex}`;
        if (!updated.has(key)) {
          updated.set(key, log);
        }
      });
      return updated;
    });
  };

  useWatchCasinoDepositEvent({
    onLogs: handleNewLogs,
    args: { account: address },
    fromBlock: BigInt(0),
  });

  useWatchCasinoWithdrawEvent({
    onLogs: handleNewLogs,
    args: { account: address },
    fromBlock: BigInt(0),
  });

  useWatchCasinoBalanceAddedEvent({
    onLogs: handleNewLogs,
    args: { account: address },
    fromBlock: BigInt(0),
  });

  useWatchCasinoBalanceRemovedEvent({
    onLogs: handleNewLogs,
    args: { account: address },
    fromBlock: BigInt(0),
  });

  const sortedEvents = Array.from(eventMap.values()).sort(
    (a, b) => Number(b.blockNumber) - Number(a.blockNumber)
  );

  return (
    <Box p="0 2 0 2" maxH={600} overflowY="auto">
      {sortedEvents.length === 0 ? <Spinner /> : <Table logs={sortedEvents} />}
    </Box>
  );
};

export default TransactionHistory;
