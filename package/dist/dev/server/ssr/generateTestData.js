import { spawn } from "child_process";
import {
  CLI_BOILERPLATE_BETA_MESSAGE,
  STREAM_DATA_CHUNK_BEGIN,
  UPGRADE_MESSAGE_LINE_BEGIN,
  UPGRADE_INSTRUCTIONS_LINE_BEGIN
} from "./constants";
import path from "path";
import fs from "fs";
const generateTestData = async () => {
  const command = "yext";
  const args = ["sites", "generate-test-data"];
  async function generate() {
    const childProcess = spawn(command, args);
    const exitCode = await new Promise((resolve) => {
      childProcess.on("close", resolve);
    });
    if (exitCode) {
      return false;
    }
    return true;
  }
  return new Promise((resolve) => {
    resolve(generate());
  });
};
const generateTestDataForPage = async (stdout, featuresConfig, entityId, locale, projectStructure) => {
  const siteStreamPath = path.resolve(
    process.cwd(),
    projectStructure.sitesConfigRoot.getAbsolutePath() + "/" + projectStructure.siteStreamConfig
  );
  const featureName = featuresConfig.features[0]?.name;
  const command = "yext";
  let args = addCommonArgs(featuresConfig, featureName, locale);
  if (entityId) {
    args = args.concat("--entityIds", entityId);
  }
  if (fs.existsSync(siteStreamPath)) {
    const siteStream = prepareJsonForCmd(
      JSON.parse(fs.readFileSync(siteStreamPath).toString())
    );
    args = args.concat("--siteStreamConfig", siteStream);
  }
  return new Promise((resolve) => {
    const childProcess = spawn(command, args, {
      stdio: ["inherit", "pipe", "inherit"],
      shell: true
    });
    let testData = "";
    let foundTestData = false;
    childProcess.stdout.on("data", (chunkBuff) => {
      const chunk = chunkBuff.toString("utf-8");
      if (foundTestData) {
        testData += chunk;
        return;
      }
      let lines = chunk.split("\n").filter((l) => !l.startsWith(CLI_BOILERPLATE_BETA_MESSAGE));
      const dataStartIndex = lines.indexOf(STREAM_DATA_CHUNK_BEGIN);
      if (dataStartIndex !== -1) {
        foundTestData = true;
        testData = lines.slice(dataStartIndex).join("\n");
        lines = lines.slice(0, dataStartIndex);
      }
      const upgradeLines = lines.filter(
        (boilerplateLine) => boilerplateLine.startsWith(UPGRADE_MESSAGE_LINE_BEGIN) || boilerplateLine.startsWith(UPGRADE_INSTRUCTIONS_LINE_BEGIN)
      ).join("\n");
      if (upgradeLines) {
        stdout.write(upgradeLines);
      } else {
        const out = lines.join("\n").trim();
        out && stdout.write(out + "\n");
      }
    });
    childProcess.on("close", () => {
      let parsedData;
      if (testData) {
        try {
          parsedData = JSON.parse(testData.trim());
        } catch (e) {
          stdout.write(
            `
Unable to parse test data from command: \`${command} ${args.join(
              " "
            )}\``
          );
          resolve(null);
        }
      } else {
        stdout.write(
          `
Unable to generate test data from command: \`${command} ${args.join(
            " "
          )}\``
        );
      }
      resolve(parsedData);
    });
  });
};
const addCommonArgs = (featuresConfig, featureName, locale) => {
  const args = [
    "pages",
    "generate-test-data",
    "--featureName",
    `"${featureName}"`,
    "--featuresConfig",
    prepareJsonForCmd(featuresConfig),
    "--locale",
    locale,
    "--printDocuments"
  ];
  return args;
};
const prepareJsonForCmd = (json) => {
  let jsonString;
  if (process.platform == "win32") {
    jsonString = `${JSON.stringify(json).replace(/([\\]*)"/g, `$1$1\\"`)}`;
  } else {
    jsonString = `'${JSON.stringify(json)}'`;
  }
  return jsonString;
};
export {
  generateTestData,
  generateTestDataForPage
};
