import fs from "fs";
import { runGenerate } from "./generate/interface.js";
var init_default = async (folderToCreate) => {
  if (folderToCreate) {
    await fs.promises.mkdir(folderToCreate);
    process.chdir(folderToCreate);
    runGenerate(folderToCreate);
  } else {
    const files = await fs.promises.readdir(".");
    if (files.length) {
      process.stdout.write(
        "Refusing to generate project: Directory not empty.\n"
      );
      process.exit(1);
    }
    runGenerate();
  }
};
export {
  init_default as default
};
