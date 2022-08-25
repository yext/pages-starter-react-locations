import * as path from "path";
import glob from "glob";
import logger from "../../log.js";
import fs from "fs";
import { fileURLToPath } from "url";
import { generateHydrationEntryPoints } from "./hydration.js";
const REACT_EXTENSIONS = /* @__PURE__ */ new Set([".tsx", ".jsx"]);
var buildStart_default = (projectStructure) => {
  return async function(options) {
    console.log(yextBanner);
    clean(projectStructure.distRoot.getAbsolutePath());
    const templates = glob.sync(
      `${projectStructure.templatesRoot.getAbsolutePath()}/**/*.{tsx,jsx,js,ts}`
    );
    const reactTemplates = templates.filter(
      (templatePath) => REACT_EXTENSIONS.has(path.parse(templatePath).ext)
    );
    copyPluginFiles(this.emitFile);
    const finisher = logger.timedLog({
      startLog: "Generating entry-points for hydration"
    });
    await generateHydrationEntryPoints(
      reactTemplates,
      projectStructure.hydrationBundleOutputRoot.getAbsolutePath()
    );
    finisher.succeed(
      `Generated ${reactTemplates.length} hydration entry-point${reactTemplates.length > 1 ? "s" : ""}`
    );
    await injectRenderer(this.emitFile);
  };
};
const clean = (yextDir) => {
  const finisher = logger.timedLog({
    startLog: "Cleaning build artifacts"
  });
  try {
    fs.rmSync(yextDir, { recursive: true });
    finisher.succeed("Finished cleaning");
  } catch (e) {
    finisher.fail("Nothing to clean");
  }
};
const copyPluginFiles = (fileEmitter) => {
  const finisher = logger.timedLog({
    startLog: "Copying Yext plugin files"
  });
  const currentPath = fileURLToPath(import.meta.url);
  const pathToPluginsDir = path.resolve(
    currentPath,
    path.join("..", "..", "..", "..", "plugin")
  );
  const pluginFiles = glob.sync(`${pathToPluginsDir}/*.ts`).map((f) => path.resolve(f));
  if (pluginFiles.length == 0) {
    finisher.fail("Failed to copy Yext plugin files");
    return;
  }
  pluginFiles.forEach((filepath) => {
    const filename = path.join("plugin", path.basename(filepath));
    fileEmitter({
      type: "asset",
      fileName: filename,
      source: fs.readFileSync(filepath).toString()
    });
  });
  finisher.succeed("Successfully copied Yext plugin files");
};
const injectRenderer = async (fileEmitter) => {
  const finisher = logger.timedLog({
    startLog: "Injecting template renderer."
  });
  const currentDir = fileURLToPath(new URL(".", import.meta.url));
  fileEmitter({
    type: "chunk",
    id: path.join(currentDir, "rendering", "renderer.js"),
    fileName: "assets/renderer/templateRenderer.js"
  });
  finisher.succeed("Injected template renderer.");
};
const yextBanner = `
                  :=*#%@@@@@%#+-:
             :=#@@%*+==-----=+*#%@%*-.
          :*@%*-.                 :=*@%+.
       .=%@+:                         -#@#=
      +@@=                              .+@%-
    -@%-                                   +@#
   =@#.       :-       =:    :=+==:         :%@:
  =@*         +@#-   :%@=  =@%+==*@@:        .@%.
  @@.          :@@* +@%   :@%   *@@=          :@%
 #@-             =@@@+    +@- =%@*.:+:         *@-
=@#               =@+     .@@%@=  :@%.         -@*
%@+               -@+      .*@@#%@%+.           @%
@@=                                             @@
@@+           #@+.    +@+ :%%%%@@%%%%=          @@
+@*            -%@*:+@#:       %@.             :@#
 @@.             :@@@=         %@.             +@=
 -@#            *@@=%@+        %@.             @@.
  *@-         =%@*.  +@%-      %@.            #@-
   %@-        -=       +:      ==            *@=
    *@*                                    :%@-
     -%@+.                               :*@#.
       =#@*:                           -#@#:
         :*@%+:                     -*@%=
            -+%@#*=-:.       .:-+*%@#=.
                :-+*#%@@@@@@@%#*=-.

      Built with the Yext SSG Plugin
`;
export {
  buildStart_default as default
};
