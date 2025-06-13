"use client";

import { Box, Container, Heading, Text } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import ActionButtons from "./_components/ActionButtons";
import TransactionTable from "./_components/TransactionTable";

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: number;
}

interface TransactionOutput {
  value: number;
  addr?: string;
}

export default function TransactionPage() {
  const webSocket = useRef<WebSocket | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [total, setTotal] = useState(0);

  const satoshiToBTC = (sat: number) => sat / 1e8;

  const start = () => {
    if (webSocket.current && webSocket.current.readyState === WebSocket.OPEN) {
      webSocket.current.send(JSON.stringify({ op: "unconfirmed_sub" }));
      setIsSubscribed(true);
      return;
    }
    webSocket.current = new WebSocket("wss://ws.blockchain.info/inv");
    webSocket.current.onopen = () => {
      webSocket.current?.send(JSON.stringify({ op: "unconfirmed_sub" }));
      setIsSubscribed(true);
    };
    webSocket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.op === "utx") {
        const transaction = data.x;
        const outputSumSat = transaction.out.reduce(
          (acc: number, output: TransactionOutput) => acc + output.value,
          0
        );
        const outputSumBTC = satoshiToBTC(outputSumSat);

        const from = transaction.inputs?.[0]?.prev_out?.addr || "Unknown";
        const to = transaction.out?.[0]?.addr || "Unknown";

        const newTransaction: Transaction = {
          hash: transaction.hash,
          from,
          to,
          value: outputSumBTC,
        };

        setTransactions((prev) => [newTransaction, ...prev]);
        setTotal((prev) => +(prev + outputSumBTC).toFixed(8));
      }
    };
    webSocket.current.onclose = () => {
      setIsSubscribed(false);
    };
    webSocket.current.onerror = () => {
      setIsSubscribed(false);
    };
  };

  const stop = () => {
    if (webSocket.current && webSocket.current.readyState === WebSocket.OPEN) {
      webSocket.current.send(JSON.stringify({ op: "unconfirmed_unsub" }));
      setIsSubscribed(false);
    }
  };

  const reset = () => {
    setTransactions([]);
    setTotal(0);
  };

  useEffect(() => {
    return () => {
      webSocket.current?.close();
    };
  }, []);

  return (
    <Container p="4">
      <Heading size="8" color="violet" mb="5">
        Real-time Bitcoin Transaction Tracker
      </Heading>

      <ActionButtons
        isSubscribed={isSubscribed}
        start={start}
        stop={stop}
        reset={reset}
      />

      <Box mb="4" className="text-lg font-semibold">
        Total Sum:
        <Text className="text-violet-700"> {total.toFixed(8)} BTC</Text>
      </Box>

      <Box className="overflow-auto max-h-[400px] border border-gray-300 rounded-md">
        <TransactionTable transactions={transactions} />
      </Box>
    </Container>
  );
}
