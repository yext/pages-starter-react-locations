import express from "express";
import { createServer as createViteServer } from "vite";
import { serverRenderRoute } from "./middleware/serverRenderRoute.js";
import { ignoreFavicon } from "./middleware/ignoreFavicon.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import { viteDevServerPort } from "./middleware/constants.js";
import { indexPage } from "./middleware/indexPage.js";
import { generateTestData } from "./ssr/generateTestData.js";
import { ProjectStructure } from "../../common/src/project/structure.js";
import { finalSlashRedirect } from "./middleware/finalSlashRedirect.js";
const createServer = async (dynamicGenerateData) => {
  const app = express();
  const projectStructure = new ProjectStructure();
  const vite = await createViteServer({
    server: {
      middlewareMode: true
    },
    appType: "custom",
    envDir: projectStructure.envVarDir,
    envPrefix: projectStructure.envVarPrefix
  });
  app.use(vite.middlewares);
  app.use(ignoreFavicon);
  app.use(finalSlashRedirect);
  let displayGenerateTestDataWarning = false;
  if (dynamicGenerateData) {
    displayGenerateTestDataWarning = !await generateTestData();
  }
  app.use(
    /^\/(.+)/,
    serverRenderRoute({ vite, dynamicGenerateData, projectStructure })
  );
  app.use(
    "/",
    indexPage({ dynamicGenerateData, displayGenerateTestDataWarning })
  );
  app.use(errorMiddleware(vite));
  app.listen(
    viteDevServerPort,
    () => process.stdout.write(`listening on :${viteDevServerPort}
`)
  );
};
export {
  createServer
};
