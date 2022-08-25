import {
  renderHeadConfigToString,
  getLang
} from "../../../../common/src/template/head.js";
const reactWrapper = (props, templateModuleInternal, template, hydrate, getHeadConfig) => {
  const projectFilepaths = props.__meta.manifest.projectFilepaths;
  const headConfig = getHeadConfig ? getHeadConfig(props) : void 0;
  const lang = getLang(headConfig, props);
  return `<!DOCTYPE html>
    <html lang=${lang}>
    <head>
        <script>window.__INITIAL__DATA__ = ${JSON.stringify(props)}<\/script>
        ${getCssTags(
    `${projectFilepaths.templatesRoot}/${templateModuleInternal.templateName}.tsx`,
    props.__meta.manifest.bundlerManifest,
    /* @__PURE__ */ new Set()
  ).map((f) => `<link rel="stylesheet" href="/${f}"/>`).filter((v, i, a) => a.indexOf(v) == i).join("\n")}
        ${headConfig ? renderHeadConfigToString(headConfig) : ""}
    </head>
    <body>
        <div id="reactele">${template}</div>${hydrate ? `<script type="module" src="/${findHydrationFilename(
    `${projectFilepaths.hydrationBundleOutputRoot}/${templateModuleInternal.templateName}.tsx`,
    props
  )}" defer><\/script>` : ""}
    </body>
    </html>`;
};
const getCssTags = (filepath, manifest, seen) => {
  const entry = Object.entries(manifest).find(([file2]) => file2 === filepath);
  if (!entry) {
    return [];
  }
  const [file, info] = entry;
  seen.add(file);
  const cssFiles = info.css || [];
  (info.imports || []).flatMap((f) => getCssTags(f, manifest, seen)).forEach((f) => cssFiles.push(f));
  return cssFiles;
};
const findHydrationFilename = (hydrationFile, data) => {
  const { __meta } = data;
  for (const [file, info] of Object.entries(__meta.manifest.bundlerManifest)) {
    if (file !== hydrationFile) {
      continue;
    }
    return info.file;
  }
};
export {
  reactWrapper
};
