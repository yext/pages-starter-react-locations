import {
  ProjectStructure
} from "../common/src/project/structure.js";
import { build } from "./build/build.js";
const plugin = (opts = {}) => {
  const projectStructure = new ProjectStructure(opts.projectStructureConfig);
  return [build(projectStructure)];
};
var plugin_default = plugin;
export {
  plugin_default as default,
  plugin as yextSSG
};
