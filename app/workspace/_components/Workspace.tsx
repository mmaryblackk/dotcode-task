"use client";

import React, { useEffect, useState } from "react";
import Block from "./Block";
import { BlockData } from "@/types/BlockData";
import { saveState, loadState, clearState } from "@/utils/storage";
import { Container, Flex, Heading, Skeleton } from "@radix-ui/themes";
import ResetButton from "./ResetButton";

const DEFAULT_BLOCKS: BlockData[] = [
  { id: 1, x: 0, y: 0, width: 300, height: 100, zIndex: 1, visible: true },
  { id: 2, x: 320, y: 0, width: 300, height: 100, zIndex: 1, visible: true },
  { id: 3, x: 640, y: 0, width: 300, height: 100, zIndex: 1, visible: true },
  { id: 4, x: 0, y: 120, width: 300, height: 100, zIndex: 1, visible: true },
  { id: 5, x: 320, y: 120, width: 300, height: 100, zIndex: 1, visible: true },
];

const Workspace: React.FC = () => {
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [maxZ, setMaxZ] = useState<number>(1);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const loaded = loadState();
    if (loaded) {
      setBlocks(loaded);
      setMaxZ(Math.max(...loaded.map((b) => b.zIndex), 1));
    } else {
      setBlocks(DEFAULT_BLOCKS);
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      saveState(blocks);
    }
  }, [blocks, initialized]);

  const updateBlock = (id: number, newProps: Partial<BlockData>) => {
    setBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, ...newProps } : block))
    );
  };

  const deleteBlock = (id: number) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === id ? { ...block, visible: false } : block
      )
    );
  };

  const bringToFront = (id: number) => {
    const newZ = maxZ + 1;
    setMaxZ(newZ);
    updateBlock(id, { zIndex: newZ });
  };

  const resetBlocks = () => {
    clearState();
    setBlocks(DEFAULT_BLOCKS);
    setMaxZ(1);
  };

  return (
    <>
      <Flex justify="between" align="center" mb="5">
        <Heading size="8" color="violet">
          Interactive Workspace
        </Heading>
        <ResetButton onReset={resetBlocks} />
      </Flex>
      <Container>
        {!initialized ? (
          <Flex direction="row" wrap="wrap" gap="4">
            <Skeleton width="300px" height="100px" />
            <Skeleton width="300px" height="100px" />
            <Skeleton width="300px" height="100px" />
            <Skeleton width="300px" height="100px" />
            <Skeleton width="300px" height="100px" />
          </Flex>
        ) : (
          blocks.map((block) => (
            <Block
              key={block.id}
              block={block}
              onUpdate={updateBlock}
              onDelete={deleteBlock}
              onBringToFront={bringToFront}
            />
          ))
        )}
      </Container>
    </>
  );
};

export default Workspace;
