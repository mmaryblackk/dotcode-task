import { Button } from "@radix-ui/themes";
import classNames from "classnames";
import React from "react";

type Props = {
  isSubscribed: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
};

const ActionButtons: React.FC<Props> = ({
  isSubscribed,
  start,
  stop,
  reset,
}) => {
  return (
    <div className="flex space-x-4 mb-6">
      <Button
        color="cyan"
        className={classNames({ "!cursor-pointer": !isSubscribed })}
        onClick={start}
        disabled={isSubscribed}
      >
        Start
      </Button>
      <Button
        color="tomato"
        className={classNames({ "!cursor-pointer": isSubscribed })}
        onClick={stop}
        disabled={!isSubscribed}
      >
        Stop
      </Button>
      <Button className="!cursor-pointer" onClick={reset}>
        Reset
      </Button>
    </div>
  );
};

export default ActionButtons;
