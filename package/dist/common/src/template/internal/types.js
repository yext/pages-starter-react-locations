import { validateTemplateModuleInternal } from "./validateTemplateModuleInternal.js";
const parse = (filepath, adjustForFingerprintedAsset) => {
  let base = filepath.split("/")[filepath.split("/").length - 1];
  const extension = base.slice(base.lastIndexOf("."));
  let name = base.slice(0, base.lastIndexOf("."));
  if (adjustForFingerprintedAsset) {
    base = base.split(extension)[0].slice(0, base.split(extension)[0].lastIndexOf(".")) + extension;
    name = name.slice(0, name.lastIndexOf("."));
  }
  return {
    base,
    name
  };
};
const convertTemplateModuleToTemplateModuleInternal = (templateFilepath, templateModule, adjustForFingerprintedAsset) => {
  const templatePath = parse(templateFilepath, adjustForFingerprintedAsset);
  const templateModuleInternal = {
    ...templateModule,
    config: convertTemplateConfigToTemplateConfigInternal(
      templatePath.name,
      templateModule.config
    ),
    path: templateFilepath,
    filename: templatePath.base,
    templateName: templatePath.name
  };
  validateTemplateModuleInternal(templateModuleInternal);
  return templateModuleInternal;
};
const convertTemplateConfigToTemplateConfigInternal = (templateName, templateConfig) => {
  return {
    name: templateConfig?.name ?? templateName,
    ...templateConfig
  };
};
export {
  convertTemplateModuleToTemplateModuleInternal
};
