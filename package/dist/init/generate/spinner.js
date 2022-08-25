import { useState, useEffect } from "react";
import React from "react";
import { Text } from "ink";
import spinners from "cli-spinners";
const Spinner = ({ type = "dots" }) => {
  const [frame, setFrame] = useState(0);
  const spinner = spinners[type];
  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((previousFrame) => {
        const isLastFrame = previousFrame === spinner.frames.length - 1;
        return isLastFrame ? 0 : previousFrame + 1;
      });
    }, spinner.interval);
    return () => {
      clearInterval(timer);
    };
  }, [spinner]);
  return /* @__PURE__ */ React.createElement(Text, null, spinner.frames[frame]);
};
var spinner_default = Spinner;
export {
  spinner_default as default
};
