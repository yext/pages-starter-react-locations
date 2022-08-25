import pathLib from "path";
import _ from "lodash";
const defaultConfig = {
  filepathsConfig: {
    templatesRoot: "src/templates",
    sitesConfigRoot: "sites-config",
    distRoot: "dist",
    hydrationBundleOutputRoot: "hydration_templates",
    serverBundleOutputRoot: "assets/server"
  },
  filenamesConfig: {
    ciConfig: "ci.json",
    featuresConfig: "features.json",
    siteStreamConfig: "site-stream.json"
  },
  envVarConfig: {
    envVarDir: "",
    envVarPrefix: "YEXT_PUBLIC"
  }
};
class ProjectStructure {
  #config;
  sitesConfigRoot;
  templatesRoot;
  distRoot;
  hydrationBundleOutputRoot;
  serverBundleOutputRoot;
  ciConfig;
  featuresConfig;
  envVarDir;
  envVarPrefix;
  siteStreamConfig;
  constructor(config) {
    this.#config = _.merge(defaultConfig, config);
    this.sitesConfigRoot = new Path(
      this.#config.filepathsConfig.sitesConfigRoot
    );
    this.templatesRoot = new Path(this.#config.filepathsConfig.templatesRoot);
    this.distRoot = new Path(this.#config.filepathsConfig.distRoot);
    this.hydrationBundleOutputRoot = new Path(
      this.#config.filepathsConfig.distRoot + "/" + this.#config.filepathsConfig.hydrationBundleOutputRoot
    );
    this.serverBundleOutputRoot = new Path(
      this.#config.filepathsConfig.distRoot + "/" + this.#config.filepathsConfig.serverBundleOutputRoot
    );
    this.ciConfig = this.#config.filenamesConfig.ciConfig;
    this.featuresConfig = this.#config.filenamesConfig.featuresConfig;
    this.envVarDir = this.#config.envVarConfig.envVarDir;
    this.envVarPrefix = this.#config.envVarConfig.envVarPrefix;
    this.siteStreamConfig = this.#config.filenamesConfig.siteStreamConfig;
  }
}
class Path {
  path;
  constructor(path) {
    this.path = path;
  }
  getRelativePath = (to) => {
    return pathLib.join(".", pathLib.relative(this.path, to));
  };
  getAbsolutePath = () => {
    return pathLib.resolve(this.path);
  };
}
export {
  Path,
  ProjectStructure
};
