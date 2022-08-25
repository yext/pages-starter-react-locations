#!/usr/bin/env node --experimental-specifier-resolution=node
import init from "../init/init.js";
import dev from "../dev/dev.js";
import preview from "../preview/preview.js";
import { features } from "../generate/features.js";
const [, , ...args] = process.argv;
["react", "react-dom"].forEach((dep) => {
  try {
    import(dep);
  } catch (e) {
    console.error(
      `Cannot find "${dep}" which is a necessary dependency for generation. Please install this module.`
    );
    process.exit(1);
  }
});
const [command] = args;
switch (command) {
  case "dev":
    await dev();
    break;
  case "preview":
    preview();
    break;
  case "init": {
    let folderToCreate;
    if (args.length == 2) {
      folderToCreate = args[1];
    }
    await init(folderToCreate || null);
    break;
  }
  case "generate": {
    const generateTargets = ["features"];
    if (args.length != 2) {
      process.stdout.write(
        `Missing a target to generate. Valid values are: ${generateTargets.join(
          ", "
        )}
`
      );
      process.exit(1);
    }
    const target = args[1];
    switch (target) {
      case "features": {
        console.log("about to run features");
        await features();
        break;
      }
      default: {
        process.stdout.write(
          `Target for 'generate' command is invalid: ${target}. Valid values are: ${generateTargets.join(
            ", "
          )}
`
        );
        process.exit(1);
      }
    }
    break;
  }
  default: {
    process.stdout.write(`Command not found: ${command}
`);
    process.exit(1);
  }
}
