import { pathToFileURL } from "url";
import {
  convertTemplateModuleToTemplateModuleInternal
} from "../../../common/src/template/internal/types.js";
const loadTemplateModules = async (serverBundlePaths) => {
  const importedModules = [];
  for (const p of serverBundlePaths) {
    let templateModule = {};
    try {
      templateModule = await import(pathToFileURL(p).toString());
    } catch (e) {
      throw new Error(`Could not import ${p} ${e}`);
    }
    const templateModuleInternal = convertTemplateModuleToTemplateModuleInternal(p, templateModule, true);
    importedModules.push({ ...templateModuleInternal, path: p });
  }
  validateModules(importedModules);
  return importedModules.reduce(
    (prev, module) => prev.set(module.config.name, module),
    /* @__PURE__ */ new Map()
  );
};
const validateModules = (templateModules) => {
  validateUniqueFeatureName(templateModules);
};
const validateUniqueFeatureName = (templateModules) => {
  const featureNames = /* @__PURE__ */ new Set();
  templateModules.map((module) => module.config.name).forEach((featureName) => {
    if (featureNames.has(featureName)) {
      throw new Error(
        `Templates must have unique feature names. Found multiple modules with "${featureName}"`
      );
    }
    featureNames.add(featureName);
  });
};
export {
  loadTemplateModules
};
