import { startTimer } from "./timing.js";
import ora from "ora";
import chalk from "chalk";
const logger = {};
logger.timedLog = (opts) => {
  const { startLog } = opts;
  const timer = startTimer();
  const spinner = ora(startLog).start();
  return {
    fail: (text) => spinner.fail(addTimingToLog(timer.stop(), text)),
    succeed: (text) => spinner.succeed(addTimingToLog(timer.stop(), text))
  };
};
const addTimingToLog = (prettyPrintedTime, text) => {
  return `${chalk.grey(`[${prettyPrintedTime}]`)} ${text}`;
};
var log_default = logger;
export {
  log_default as default
};
