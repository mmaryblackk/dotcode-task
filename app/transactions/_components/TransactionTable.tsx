import React from "react";
import { Transaction } from "../page";
import { Table, Text } from "@radix-ui/themes";

type Props = {
  transactions: Transaction[];
};

const TransactionTable: React.FC<Props> = ({ transactions }) => (
  <Table.Root variant="surface">
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeaderCell justify="center">Hash</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell justify="center">From</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell justify="center">To</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell justify="center">
          Value (BTC)
        </Table.ColumnHeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <Table.Row key={transaction.hash}>
            <Table.Cell className="break-words max-w-xs">
              {transaction.hash}
            </Table.Cell>
            <Table.Cell className="break-words max-w-xs">
              {transaction.from}
            </Table.Cell>
            <Table.Cell className="break-words max-w-xs">
              {transaction.to}
            </Table.Cell>
            <Table.Cell>{transaction.value.toFixed(8)}</Table.Cell>
          </Table.Row>
        ))
      ) : (
        <Table.Row>
          <Table.Cell colSpan={4} className="text-center">
            <Text size="3">
              No transactions yet. Click &quot;Start&quot; to begin.
            </Text>
          </Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
  </Table.Root>
);

export default TransactionTable;
