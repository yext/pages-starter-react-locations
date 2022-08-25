import { render, Text } from "ink";
import React, { useEffect, useState, Fragment } from "react";
import { spawn } from "child_process";
import { generate } from "./generate.js";
import Spinner from "./spinner.js";
async function runGenerate(destinationFolder) {
  return new Promise(() => {
    render(/* @__PURE__ */ React.createElement(Generator, {
      destinationFolder
    }));
  });
}
const Generator = ({
  destinationFolder
}) => {
  const [steps, setSteps] = useState([]);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(void 0);
  useEffect(() => {
    generate({
      startStep(step) {
        setSteps((old) => [...old, { title: step, output: [] }]);
      },
      runCommand(command) {
        return new Promise((resolve, reject) => {
          const spawned = spawn(command, {
            stdio: ["inherit", "pipe", "pipe"],
            shell: true
          });
          spawned.on("error", reject);
          spawned.on("exit", (exitCode) => resolve(exitCode || 0));
          spawned.stdout.setEncoding("utf-8");
          spawned.stdout.on("data", (chunk) => {
            setSteps((old) => {
              const prev = old.slice(0, -1);
              let last = old[old.length - 1];
              const lastOutput = last.output[last.output.length - 1];
              if (lastOutput && lastOutput.type === "out") {
                last = {
                  ...last,
                  output: [
                    ...last.output.slice(0, -1),
                    {
                      type: "out",
                      content: lastOutput.content + chunk
                    }
                  ]
                };
              } else {
                last = {
                  ...last,
                  output: [
                    ...last.output,
                    {
                      type: "out",
                      content: chunk
                    }
                  ]
                };
              }
              return [...prev, last];
            });
          });
          spawned.stderr.setEncoding("utf-8");
          spawned.stderr.on("data", (chunk) => {
            setSteps((old) => {
              const prev = old.slice(0, -1);
              let last = old[old.length - 1];
              const lastOutput = last.output[last.output.length - 1];
              if (lastOutput && lastOutput.type === "err") {
                last = {
                  ...last,
                  output: [
                    ...last.output.slice(0, -1),
                    {
                      type: "err",
                      content: lastOutput.content + chunk
                    }
                  ]
                };
              } else {
                last = {
                  ...last,
                  output: [
                    ...last.output,
                    {
                      type: "err",
                      content: chunk
                    }
                  ]
                };
              }
              return [...prev, last];
            });
          });
        });
      }
    }).then(() => setDone(true)).catch((err) => {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    });
  }, []);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, steps.map((step, i) => {
    const isLastStep = i === steps.length - 1;
    return /* @__PURE__ */ React.createElement(Fragment, {
      key: i
    }, /* @__PURE__ */ React.createElement(Text, {
      bold: isLastStep && !done
    }, isLastStep && !done && !error ? /* @__PURE__ */ React.createElement(Text, {
      color: "yellow"
    }, /* @__PURE__ */ React.createElement(Spinner, null)) : isLastStep && error ? /* @__PURE__ */ React.createElement(Text, {
      color: "redBright"
    }, "\u2717") : /* @__PURE__ */ React.createElement(Text, {
      color: "green"
    }, "\u2713"), " ", step.title), error && step.output.map(
      (output) => output.content && /* @__PURE__ */ React.createElement(Text, {
        key: i,
        color: output.type === "err" ? "redBright" : "white"
      }, output.content)
    ));
  }), error && /* @__PURE__ */ React.createElement(Text, {
    color: "redBright"
  }, "Project generation failed: ", error), done && /* @__PURE__ */ React.createElement(Text, {
    color: "white"
  }, "\n", /* @__PURE__ */ React.createElement(Text, {
    color: "greenBright"
  }, "Done!"), " Try the following commands to get started:", "\n", destinationFolder && /* @__PURE__ */ React.createElement(Text, {
    bold: true
  }, `cd ${destinationFolder}`), "\n", /* @__PURE__ */ React.createElement(Text, {
    bold: true
  }, "npm run dev"), "   ", /* @__PURE__ */ React.createElement(Text, {
    color: "white"
  }, "# Start a development server"), "\n"));
};
export {
  runGenerate
};
