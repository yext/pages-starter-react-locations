import fs from "fs-extra";
import path from "path";
import { convertToPosixPath } from "../../../common/src/template/paths.js";
const generateManifestFile = (templateModules, projectStructure) => {
  const featureNameToBundlePath = /* @__PURE__ */ new Map();
  for (const [featureName, module] of templateModules.entries()) {
    featureNameToBundlePath.set(featureName, module.path);
  }
  const distRoot = projectStructure.distRoot.getAbsolutePath();
  const relativeBundlePaths = Array.from(featureNameToBundlePath.entries()).map(
    ([name, path2]) => [
      name,
      convertToPosixPath(projectStructure.distRoot.getRelativePath(path2))
    ]
  );
  let bundlerManifest = Buffer.from("{}");
  if (fs.existsSync(path.join(distRoot, "manifest.json"))) {
    bundlerManifest = fs.readFileSync(path.join(distRoot, "manifest.json"));
  }
  const manifest = {
    bundlePaths: Object.fromEntries(relativeBundlePaths),
    projectFilepaths: {
      templatesRoot: projectStructure.templatesRoot.path,
      distRoot: projectStructure.distRoot.path,
      hydrationBundleOutputRoot: projectStructure.hydrationBundleOutputRoot.path,
      serverBundleOutputRoot: projectStructure.serverBundleOutputRoot.path
    },
    bundlerManifest: JSON.parse(bundlerManifest.toString())
  };
  writeFile(
    path.join(distRoot, "plugin", "manifest.json"),
    JSON.stringify(manifest, null, "  ")
  );
  fs.remove(path.join(distRoot, "manifest.json"));
};
const writeFile = (filepath, contents) => {
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, contents);
};
export {
  generateManifestFile
};
