import {
  generateResponses,
  readTemplateModules
} from "./templateUtils";
var renderer_default = async (props) => {
  const manifest = props.__meta.manifest;
  const template = await readTemplateModules(props.document.__.name, manifest);
  const responses = await generateResponses(template, props);
  return responses;
};
export {
  renderer_default as default
};
