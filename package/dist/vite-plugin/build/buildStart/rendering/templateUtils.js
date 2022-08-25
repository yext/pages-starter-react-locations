import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { getRelativePrefixToRootFromPath } from "../../../../common/src/template/paths.js";
import { reactWrapper } from "./wrapper.js";
import {
  convertTemplateModuleToTemplateModuleInternal
} from "../../../../common/src/template/internal/types.js";
const pathToModule = /* @__PURE__ */ new Map();
const readTemplateModules = async (feature, manifest) => {
  const path = manifest.bundlePaths[feature].replace("assets", "..");
  if (!path) {
    throw new Error(`Could not find path for feature ${feature}`);
  }
  let importedModule = pathToModule.get(path);
  if (!importedModule) {
    importedModule = await import(path);
  }
  const templateModuleInternal = convertTemplateModuleToTemplateModuleInternal(
    path,
    importedModule,
    true
  );
  pathToModule.set(path, templateModuleInternal);
  return templateModuleInternal;
};
const generateResponses = async (templateModuleInternal, templateProps) => {
  if (templateModuleInternal.transformProps) {
    templateProps = await templateModuleInternal.transformProps(templateProps);
  }
  const path = templateModuleInternal.getPath(templateProps);
  if (!path) {
    throw new Error(
      `getPath does not return a valid string in template '${templateModuleInternal.templateName}'`
    );
  }
  const templateRenderProps = {
    ...templateProps,
    path,
    relativePrefixToRoot: getRelativePrefixToRootFromPath(path)
  };
  const content = renderHtml(templateModuleInternal, templateRenderProps);
  return {
    content,
    path,
    redirects: templateModuleInternal.getRedirects?.(templateRenderProps) ?? []
  };
};
const renderHtml = (templateModuleInternal, props) => {
  const { default: component, render, getHeadConfig } = templateModuleInternal;
  if (!component && !render) {
    throw new Error(
      `Cannot render html from template '${templateModuleInternal.config.name}'. Template is missing render function or default export.`
    );
  }
  if (render) {
    if (getHeadConfig) {
      console.warn(
        `getHeadConfig for template ${templateModuleInternal.config.name} will not be called since a custom render function is defined.`
      );
    }
    return render(props);
  }
  return reactWrapper(
    props,
    templateModuleInternal,
    renderToString(createElement(component, props)),
    true,
    getHeadConfig
  );
};
export {
  generateResponses,
  readTemplateModules
};
