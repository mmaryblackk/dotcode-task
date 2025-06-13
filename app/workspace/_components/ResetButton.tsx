"use client";

import { Flex, Button } from "@radix-ui/themes";
import React from "react";

interface ControlsProps {
  onReset: () => void;
}

const ResetButton: React.FC<ControlsProps> = ({ onReset }) => {
  return (
    <Flex>
      <Button className="!cursor-pointer" onClick={onReset} size="3">
        Reset
      </Button>
    </Flex>
  );
};

export default ResetButton;
