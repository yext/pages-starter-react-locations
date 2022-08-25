import path from "path";
import fs from "fs";
import { readdir } from "fs/promises";
const LOCAL_DATA_PATH = "localData";
class LocalDataManifest {
  static;
  entity;
  constructor() {
    this.static = [];
    this.entity = /* @__PURE__ */ new Map();
  }
}
const getLocalDataManifest = async () => {
  const localDataManifest = new LocalDataManifest();
  let dir;
  try {
    dir = await readdir(LOCAL_DATA_PATH);
  } catch (err) {
    if (err.code === "ENOENT") {
      return localDataManifest;
    } else {
      throw err;
    }
  }
  for (const fileName of dir) {
    const data = JSON.parse(
      fs.readFileSync(
        path.resolve(process.cwd(), `${LOCAL_DATA_PATH}/${fileName}`)
      ).toString()
    );
    const featureName = data.__?.name?.toString();
    const entityId = data.id?.toString();
    if (featureName) {
      if (entityId) {
        localDataManifest.entity.set(featureName, [
          ...localDataManifest.entity.get(featureName) || [],
          entityId
        ]);
      } else {
        localDataManifest.static.push(featureName);
      }
    }
  }
  return localDataManifest;
};
const getLocalDataForEntity = async (entityId, locale) => {
  try {
    const dir = await readdir(LOCAL_DATA_PATH);
    for (const fileName of dir) {
      const data = JSON.parse(
        fs.readFileSync(
          path.resolve(process.cwd(), `${LOCAL_DATA_PATH}/${fileName}`)
        ).toString()
      );
      if (data.id?.toString() === entityId && data.locale === locale) {
        return data;
      }
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      throw "No localData exists. Please run `yext sites generate-test-data`";
    } else {
      throw err;
    }
  }
  throw new Error(
    `No localData files match entityId and locale: ${entityId} ${locale}`
  );
};
export {
  getLocalDataForEntity,
  getLocalDataManifest
};
