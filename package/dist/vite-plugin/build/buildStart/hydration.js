import path from "path";
import fs from "fs-extra";
import handlebars from "handlebars";
const hydrationTemplate = `import * as React from "react";
import * as ReactDOM from "react-dom";
import Page from "{{importPath}}";

const data = (window as any).__INITIAL__DATA__;
ReactDOM.hydrate(<Page {...data} />, document.getElementById("reactele"));`;
const genHydrationTemplates = (importPath) => handlebars.compile(hydrationTemplate)({ importPath });
const generateHydrationEntryPoints = async (reactEntryPoints, hydrationOutputDir) => {
  reactEntryPoints.forEach(
    (entrypoint) => generateEntryPoint(entrypoint, hydrationOutputDir)
  );
};
const generateEntryPoint = (templatePath, hydrationOutputDir) => {
  const basename = path.basename(templatePath);
  const extension = path.extname(templatePath);
  const absoluteTemplatePath = path.resolve(templatePath);
  const relPath = path.relative(hydrationOutputDir, absoluteTemplatePath).replaceAll("\\", "/");
  const templateBytes = genHydrationTemplates(
    relPath.substring(0, relPath.length - extension.length)
  );
  if (!fs.existsSync(hydrationOutputDir)) {
    fs.mkdirSync(hydrationOutputDir, { recursive: true });
  }
  const outName = basename.substring(0, basename.length - extension.length);
  const outPath = `${hydrationOutputDir}/${outName}.tsx`;
  fs.writeFileSync(outPath, templateBytes, {});
};
export {
  generateHydrationEntryPoints
};
