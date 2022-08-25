import { pageLoader } from "../ssr/pageLoader.js";
import { urlToFeature } from "../ssr/urlToFeature.js";
import page404 from "../public/404";
import { convertTemplateConfigInternalToFeaturesConfig } from "../../../common/src/feature/features.js";
import { validateTemplateModuleInternal } from "../../../common/src/template/internal/validateTemplateModuleInternal.js";
import { featureNameToTemplateModuleInternal } from "../ssr/featureNameToTemplateModuleInternal.js";
import {
  renderHeadConfigToString,
  getLang
} from "../../../common/src/template/head.js";
const serverRenderRoute = ({ vite, dynamicGenerateData, projectStructure }) => async (req, res, next) => {
  try {
    const url = new URL("http://" + req.headers.host + req.originalUrl);
    const { feature, entityId, locale } = urlToFeature(url);
    const templateModuleInternal = await featureNameToTemplateModuleInternal(
      vite,
      feature
    );
    if (!templateModuleInternal) {
      console.error(
        `Cannot find template corresponding to feature: ${feature}`
      );
      return res.status(404).end(page404);
    }
    validateTemplateModuleInternal(templateModuleInternal);
    const featuresConfig = convertTemplateConfigInternalToFeaturesConfig(
      templateModuleInternal.config
    );
    const React = await import("react");
    const ReactDOMServer = await import("react-dom/server");
    const { template, Component, props } = await pageLoader(
      {
        url: url.pathname,
        vite,
        templateFilename: templateModuleInternal.filename,
        entityId,
        locale,
        featuresConfig,
        dynamicGenerateData,
        projectStructure
      }
    );
    const appHtml = await ReactDOMServer.renderToString(
      React.createElement(Component, props)
    );
    const headConfig = templateModuleInternal.getHeadConfig ? templateModuleInternal.getHeadConfig(props) : void 0;
    const lang = getLang(headConfig, props);
    const html = template.replace(`<!--app-html-->`, appHtml).replace(
      `<!--app-head-->`,
      `<head>
            <script type="text/javascript">
              window._RSS_PROPS_ = ${JSON.stringify(props)};
              window._RSS_TEMPLATE_ = '${templateModuleInternal.filename}';
              window._RSS_LANG_ = '${lang}';
            <\/script>
            ${!templateModuleInternal.render && headConfig ? renderHeadConfigToString(headConfig) : ""}
          </head>`
    );
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (e) {
    next(e);
  }
};
export {
  serverRenderRoute
};
