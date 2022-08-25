import { getRuntime } from "./runtime";
const isProduction = (domain) => {
  const runtime = getRuntime();
  return runtime.name === "browser" && domain === window?.location?.hostname;
};
export {
  isProduction
};
