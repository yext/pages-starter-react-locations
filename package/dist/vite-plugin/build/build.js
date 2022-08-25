import buildStart from "./buildStart/buildStart.js";
import closeBundle from "./closeBundle/closeBundle.js";
import { readdir } from "fs/promises";
import path, { parse } from "path";
const intro = `var global = globalThis;`;
const build = (projectStructure) => {
  return {
    name: "vite-plugin:build",
    apply: "build",
    config: async () => {
      return {
        envDir: projectStructure.envVarDir,
        envPrefix: projectStructure.envVarPrefix,
        build: {
          outDir: projectStructure.distRoot.path,
          manifest: true,
          rollupOptions: {
            preserveEntrySignatures: "strict",
            input: await discoverInputs(
              projectStructure.templatesRoot.getAbsolutePath(),
              projectStructure.hydrationBundleOutputRoot.getAbsolutePath()
            ),
            output: {
              intro,
              assetFileNames: "assets/static/[name]-[hash][extname]",
              chunkFileNames: "assets/static/[name]-[hash].js"
            }
          }
        }
      };
    },
    buildStart: buildStart(projectStructure),
    closeBundle: closeBundle(projectStructure)
  };
};
const discoverInputs = async (templateDir, hydrationOutputDir) => {
  return (await readdir(templateDir)).reduce(
    (input, template) => {
      const parsedPath = parse(template);
      if (parsedPath.ext === ".tsx" || parsedPath.ext === ".jsx") {
        input[`hydrate/${parsedPath.name}`] = path.join(hydrationOutputDir, template).replace("jsx", "tsx");
      }
      input[`server/${parsedPath.name}`] = path.join(templateDir, template);
      return input;
    },
    {}
  );
};
export {
  build
};
