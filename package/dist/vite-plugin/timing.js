import prettyMilliseconds from "pretty-ms";
const startTimer = () => {
  const startTime = new Date().getTime();
  return {
    stop: () => {
      const endTime = new Date().getTime();
      return prettyMilliseconds(endTime.valueOf() - startTime.valueOf());
    }
  };
};
export {
  startTimer
};
