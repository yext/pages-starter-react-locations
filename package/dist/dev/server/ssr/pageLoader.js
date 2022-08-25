import { getLocalDataForEntity } from "./getLocalData.js";
import { TEMPLATE_PATH } from "./constants.js";
import { generateTestDataForPage } from "./generateTestData.js";
import templateBase from "../public/templateBase";
import { getRelativePrefixToRootFromPath } from "../../../common/src/template/paths.js";
const pageLoader = async ({
  url,
  vite,
  templateFilename,
  entityId,
  locale,
  featuresConfig,
  dynamicGenerateData,
  projectStructure
}) => {
  let template = templateBase;
  template = await vite.transformIndexHtml(url, template);
  const module = await vite.ssrLoadModule(
    `/${TEMPLATE_PATH}/${templateFilename}`
  );
  if (!module.default) {
    throw Error(
      `Default export missing in template: /${TEMPLATE_PATH}/${templateFilename}`
    );
  }
  const {
    default: Component,
    transformProps,
    getPath
  } = module;
  let document;
  if (dynamicGenerateData) {
    document = await generateTestDataForPage(
      process.stdout,
      featuresConfig,
      entityId,
      locale,
      projectStructure
    );
  } else {
    document = await getLocalDataForEntity(entityId, locale);
  }
  if (entityId && !document) {
    throw new Error(
      `Could not find document data for entityId and locale: ${entityId} ${locale}`
    );
  }
  let templateProps = {
    document,
    __meta: { mode: "development" }
  };
  if (transformProps) {
    templateProps = await transformProps(templateProps);
  }
  const path = getPath(templateProps);
  if (!path) {
    throw new Error(
      `getPath does not return a valid string in template '${TEMPLATE_PATH}/${templateFilename}'`
    );
  }
  const templateRenderProps = {
    ...templateProps,
    path,
    relativePrefixToRoot: getRelativePrefixToRootFromPath(path)
  };
  return { template, Component, props: templateRenderProps };
};
export {
  pageLoader
};
