import { statSync } from "fs";
import glob from "glob";
import path from "path";
const PLUGIN_FILESIZE_LIMIT = 1.5;
const PLUGIN_TOTAL_FILESIZE_LIMIT = 10;
const validateBundles = () => {
  const bundlePaths = getBundlePaths();
  let sizeOfAllBundles = 0;
  bundlePaths.forEach((bundlePath) => {
    sizeOfAllBundles += validateFilesize(bundlePath);
  });
  validateTotalSourceSize(sizeOfAllBundles);
};
const getBundlePaths = () => {
  return glob.sync(
    `${path.resolve("dist/assets")}/{renderer,server,static}/**/*.*`
  );
};
const validateFilesize = (serverBundlePath) => {
  const stats = statSync(serverBundlePath);
  if (stats.size / (1024 * 1024) > PLUGIN_FILESIZE_LIMIT) {
    throw new Error(
      `Bundled file ${serverBundlePath} exceeds max size of ${PLUGIN_FILESIZE_LIMIT} MB`
    );
  }
  return stats.size;
};
const validateTotalSourceSize = (totalSizeInBytes) => {
  if (totalSizeInBytes / (1024 * 1024) > PLUGIN_TOTAL_FILESIZE_LIMIT) {
    throw new Error(
      `The total size of all bundles exceeds the max size of ${PLUGIN_TOTAL_FILESIZE_LIMIT} MB`
    );
  }
};
export {
  validateBundles
};
