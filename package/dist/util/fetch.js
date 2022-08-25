import { getRuntime } from "./runtime";
const fetchInternal = async (input, init) => {
  const runtime = getRuntime();
  if (runtime.name == "node" && runtime.getNodeMajorVersion() < 18) {
    const { default: crossFetch } = await import("cross-fetch");
    return crossFetch(input, init);
  }
  return fetch(input, init);
};
export {
  fetchInternal as fetch
};
