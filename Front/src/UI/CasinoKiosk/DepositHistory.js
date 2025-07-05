import { useState } from "react";
import { useAccount } from "wagmi";
import {
  useWatchCasinoBalanceAddedEvent,
  useWatchCasinoBalanceRemovedEvent,
  useWatchCasinoDepositEvent,
  useWatchCasinoWithdrawEvent,
} from "@Contract-hooks/generated";
import { Table, Spinner, Box, Heading } from "@chakra-ui/react";

const DepositHistory = () => {
  const { address } = useAccount();
  const [eventMap, setEventMap] = useState(new Map());

  const handleNewLogs = (logs) => {
    console.log(logs);
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

  return sortedEvents.length === 0 ? (
    <Spinner />
  ) : (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Type</Table.ColumnHeader>
          <Table.ColumnHeader>Amount</Table.ColumnHeader>
          <Table.ColumnHeader>Block</Table.ColumnHeader>
          <Table.ColumnHeader>Tx Hash</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {sortedEvents.map((event, idx) => {
          const type = event.eventName || "Unknown";
          const amount =
            event.args?.amount ||
            event.args?.value ||
            event.args?.balance ||
            "—";

          return (
            <Table.Row key={idx}>
              <Table.Cell>{type}</Table.Cell>
              <Table.Cell>{amount.toString()}</Table.Cell>
              <Table.Cell>{event.blockNumber?.toString()}</Table.Cell>
              <Table.Cell>{event.transactionHash?.slice(0, 10)}...</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};

export default DepositHistory;
