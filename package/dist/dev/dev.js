import { createServer } from "./server/server.js";
import { viteDevServerPort } from "./server/middleware/constants.js";
import open from "open";
var dev_default = async () => {
  const [, , ...args] = process.argv;
  if (args.some((arg) => ["local"].includes(arg))) {
    await createServer(false);
  } else {
    await createServer(true);
  }
  await open(`http://localhost:${viteDevServerPort}/`);
};
export {
  dev_default as default
};
