"use client";

import React from "react";
import { Rnd } from "react-rnd";
import { BlockData } from "@/types/BlockData";
import { Button, Card, Flex, Heading } from "@radix-ui/themes";

interface BlockProps {
  block: BlockData;
  onUpdate: (id: number, newProps: Partial<BlockData>) => void;
  onDelete: (id: number) => void;
  onBringToFront: (id: number) => void;
}

const Block: React.FC<BlockProps> = ({
  block,
  onUpdate,
  onDelete,
  onBringToFront,
}) => {
  if (!block.visible) return null;

  return (
    <Rnd
      size={{ width: block.width, height: block.height }}
      position={{ x: block.x, y: block.y }}
      onDragStop={(e, d) => {
        onUpdate(block.id, { x: d.x, y: d.y });
        onBringToFront(block.id);
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        onUpdate(block.id, {
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
          ...position,
        });
      }}
      grid={[10, 10]}
      minWidth={120}
      minHeight={50}
      style={{
        backgroundColor: "#a684ff",
        borderRadius: "8px",
        zIndex: block.zIndex,
        position: "absolute",
        cursor: "move",
      }}
      onClick={() => onBringToFront(block.id)}
    >
      <Card className="h-full">
        <Flex justify="between">
          <Heading size="6" color="violet">
            Block {block.id}
          </Heading>
          <Button
            className="!cursor-pointer"
            size="1"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(block.id);
            }}
          >
            ✖
          </Button>
        </Flex>
      </Card>
    </Rnd>
  );
};

export default Block;
