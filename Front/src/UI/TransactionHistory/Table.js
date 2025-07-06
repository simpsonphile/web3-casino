import { Table as ChakraTable } from "@chakra-ui/react";

const Table = ({ logs }) => {
  return (
    <ChakraTable.Root bg="transparent" max>
      <ChakraTable.Header bg="transparent" color="white">
        <ChakraTable.Row bg="transparent" color="white">
          <ChakraTable.ColumnHeader color="white">
            Type
          </ChakraTable.ColumnHeader>
          <ChakraTable.ColumnHeader color="white">
            Amount
          </ChakraTable.ColumnHeader>
          <ChakraTable.ColumnHeader color="white">
            Block
          </ChakraTable.ColumnHeader>
          <ChakraTable.ColumnHeader color="white">
            Tx Hash
          </ChakraTable.ColumnHeader>
        </ChakraTable.Row>
      </ChakraTable.Header>

      <ChakraTable.Body bg="transparent">
        {logs.map((event, idx) => {
          const type = event.eventName || "Unknown";
          const amount =
            event.args?.amount ||
            event.args?.value ||
            event.args?.balance ||
            "—";

          return (
            <ChakraTable.Row bg="transparent" key={idx}>
              <ChakraTable.Cell>{type}</ChakraTable.Cell>
              <ChakraTable.Cell>{amount.toString()}</ChakraTable.Cell>
              <ChakraTable.Cell>
                {event.blockNumber?.toString()}
              </ChakraTable.Cell>
              <ChakraTable.Cell>
                {event.transactionHash?.slice(0, 10)}...
              </ChakraTable.Cell>
            </ChakraTable.Row>
          );
        })}
      </ChakraTable.Body>
    </ChakraTable.Root>
  );
};

export default Table;
