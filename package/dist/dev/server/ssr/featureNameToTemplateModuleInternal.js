import { TEMPLATE_PATH } from "./constants.js";
import { readdir } from "fs/promises";
import { loadTemplateModule } from "./loadTemplateModule.js";
import {
  convertTemplateModuleToTemplateModuleInternal
} from "../../../common/src/template/internal/types.js";
const featureNameToTemplateModuleInternal = async (devserver, featureName) => {
  const directoryFilenames = await readdir(`./${TEMPLATE_PATH}`);
  for (const filename of directoryFilenames) {
    const templateFilepath = `${TEMPLATE_PATH}/${filename}`;
    const templateModule = await loadTemplateModule(
      devserver,
      templateFilepath
    );
    const templateModuleInternal = convertTemplateModuleToTemplateModuleInternal(
      templateFilepath,
      templateModule,
      false
    );
    if (featureName === templateModuleInternal.config.name) {
      return templateModuleInternal;
    }
  }
  return null;
};
export {
  featureNameToTemplateModuleInternal
};
