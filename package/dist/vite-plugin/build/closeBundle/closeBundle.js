import glob from "glob";
import * as path from "path";
import logger from "../../log.js";
import { generateManifestFile } from "./manifest.js";
import colors from "picocolors";
import { validateBundles } from "./bundleValidator.js";
import {
  loadTemplateModules
} from "../../../common/src/template/internal/loader.js";
var closeBundle_default = (projectStructure) => {
  return async () => {
    let finisher = logger.timedLog({ startLog: "Validating template modules" });
    let templateModules;
    try {
      const serverBundles = glob.sync(
        path.join(
          projectStructure.serverBundleOutputRoot.getAbsolutePath(),
          "**/*.js"
        )
      );
      templateModules = await loadTemplateModules(serverBundles, false, true);
      validateBundles();
      finisher.succeed("Validated template modules");
    } catch (e) {
      finisher.fail("One or more template modules failed validation");
      console.error(colors.red(e.message));
      return;
    }
    finisher = logger.timedLog({ startLog: "Writing manifest.json" });
    try {
      await generateManifestFile(templateModules, projectStructure);
      finisher.succeed("Successfully wrote manifest.json");
    } catch (e) {
      finisher.fail("Failed to write manifest.json");
      console.error(colors.red(e.message));
    }
  };
};
export {
  closeBundle_default as default
};
