import {
  convertTemplateModuleToTemplateModuleInternal
} from "./types.js";
import esbuild from "esbuild";
import { importFromString } from "module-from-string";
import { pathToFileURL } from "url";
const TEMP_DIR = ".temp";
const loadTemplateModules = async (templateModulePaths, transpile, adjustForFingerprintedAsset) => {
  console.log("about to loadTemplateModules");
  const importedModules = [];
  for (const templateModulePath of templateModulePaths) {
    let templateModule = {};
    console.log("modulePath: " + templateModulePath);
    try {
      if (transpile) {
        const buildResult = await esbuild.build({
          entryPoints: [templateModulePath],
          outdir: TEMP_DIR,
          write: false,
          format: "esm",
          bundle: true
        });
        console.log("buildResult");
        console.log(buildResult);
        templateModule = await importFromString(
          buildResult.outputFiles[0].text,
          { transformOptions: {
            loader: "ts"
          } }
        );
        console.log("templateModule");
        console.log(templateModule);
      } else {
        templateModule = await import(pathToFileURL(templateModulePath).toString());
      }
    } catch (e) {
      throw new Error(`Could not import ${templateModulePath} ${e}`);
    }
    console.log("about to convert");
    const templateModuleInternal = convertTemplateModuleToTemplateModuleInternal(
      templateModulePath,
      templateModule,
      adjustForFingerprintedAsset
    );
    console.log(templateModuleInternal);
    importedModules.push({
      ...templateModuleInternal,
      path: templateModulePath
    });
  }
  return importedModules.reduce((prev, module) => {
    if (prev.has(module.config.name)) {
      throw new Error(
        `Templates must have unique feature names. Found multiple modules with "${module.config.name}"`
      );
    }
    return prev.set(module.config.name, module);
  }, /* @__PURE__ */ new Map());
};
export {
  loadTemplateModules
};
