import { importFresh } from "./moduleImports.js";
const loadTemplateModule = async (devserver, templateFilepath) => {
  return await importFresh(devserver, templateFilepath);
};
export {
  loadTemplateModule
};
