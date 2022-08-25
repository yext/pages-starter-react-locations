import fs from "fs-extra";
import glob from "glob";
import path from "path";
import {
  convertTemplateConfigToFeatureConfig
} from "../common/src/feature/features.js";
import {
  loadTemplateModules
} from "../common/src/template/internal/loader.js";
const TEMPLATES_ROOT = "/src/templates";
const features = async () => {
  console.log("loadModules start");
  const templateModules = await loadTemplateModules(
    glob.sync(path.join(process.cwd(), TEMPLATES_ROOT, "/**/*.{tsx,jsx}")),
    true,
    false
  );
  console.log("loadModules end");
  await createFeaturesJson(templateModules, "./sites-config/features.json");
};
const createFeaturesJson = async (templateModules, featurePath) => {
  const features2 = [];
  const streams = [];
  console.log("templateModules");
  console.log(templateModules);
  for (const [_, module] of templateModules.entries()) {
    const featureConfig = convertTemplateConfigToFeatureConfig(module.config);
    features2.push(featureConfig);
    module.config.stream && streams.push({ ...module.config.stream });
  }
  const featureDir = path.dirname(featurePath);
  if (!fs.existsSync(featureDir)) {
    console.log("mkdir start: " + featureDir);
    fs.mkdirSync(featureDir);
    console.log("mkdir end");
  }
  console.log("mergeFeatureJson");
  const featuresJson = mergeFeatureJson(featurePath, features2, streams);
  console.log("writeFileSync start");
  fs.writeFileSync(featurePath, JSON.stringify(featuresJson, null, "  "));
  console.log("writeFileSync end");
};
const mergeFeatureJson = (featurePath, features2, streams) => {
  let originalFeaturesJson = {};
  if (fs.existsSync(featurePath)) {
    originalFeaturesJson = JSON.parse(fs.readFileSync(featurePath).toString());
  }
  return {
    ...originalFeaturesJson,
    features: features2,
    streams
  };
};
export {
  createFeaturesJson,
  features
};
