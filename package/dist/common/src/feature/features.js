import { convertTemplateConfigToStreamConfig } from "./stream.js";
const convertTemplateConfigInternalToFeaturesConfig = (config) => {
  const featureConfig = convertTemplateConfigToFeatureConfig(config);
  const streamConfig = convertTemplateConfigToStreamConfig(config);
  return {
    features: [featureConfig],
    ...streamConfig ? { streams: [streamConfig] } : ""
  };
};
const convertTemplateConfigToFeatureConfig = (config) => {
  const streamConfig = config.stream || null;
  let featureConfigBase = {
    name: config.name,
    streamId: streamConfig ? streamConfig.$id : config.streamId ? config.streamId : void 0,
    templateType: "JS",
    alternateLanguageFields: config.alternateLanguageFields
  };
  let featureConfig;
  if (!config.streamId && (!streamConfig || !streamConfig.$id)) {
    featureConfig = {
      ...featureConfigBase,
      staticPage: {
        plugin: {}
      }
    };
  } else {
    featureConfig = {
      ...featureConfigBase,
      entityPageSet: {
        plugin: {}
      }
    };
  }
  return featureConfig;
};
export {
  convertTemplateConfigInternalToFeaturesConfig,
  convertTemplateConfigToFeatureConfig
};
