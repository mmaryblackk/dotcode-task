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
  const ws = useRef<WebSocket | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [total, setTotal] = useState(0);

  const satoshiToBTC = (sat: number) => sat / 1e8;

  const start = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ op: "unconfirmed_sub" }));
      setIsSubscribed(true);
      return;
    }
    ws.current = new WebSocket("wss://ws.blockchain.info/inv");
    ws.current.onopen = () => {
      ws.current?.send(JSON.stringify({ op: "unconfirmed_sub" }));
      setIsSubscribed(true);
    };
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.op === "utx") {
        const tx = data.x;
        const outputSumSat = tx.out.reduce(
          (acc: number, output: TransactionOutput) => acc + output.value,
          0
        );
        const outputSumBTC = satoshiToBTC(outputSumSat);

        const from = tx.inputs?.[0]?.prev_out?.addr || "Unknown";
        const to = tx.out?.[0]?.addr || "Unknown";

        const newTx: Transaction = {
          hash: tx.hash,
          from,
          to,
          value: outputSumBTC,
        };

        setTransactions((prev) => [newTx, ...prev]);
        setTotal((prev) => +(prev + outputSumBTC).toFixed(8));
      }
    };
    ws.current.onclose = () => {
      setIsSubscribed(false);
    };
    ws.current.onerror = () => {
      setIsSubscribed(false);
    };
  };

  const stop = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ op: "unconfirmed_unsub" }));
      setIsSubscribed(false);
    }
  };

  const reset = () => {
    setTransactions([]);
    setTotal(0);
  };

  useEffect(() => {
    return () => {
      ws.current?.close();
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
