const convertTemplateConfigToStreamConfig = (config) => {
  if (!config) {
    config = {};
  }
  if (config.stream) {
    return {
      ...config.stream,
      source: "knowledgeGraph",
      destination: "pages"
    };
  }
};
export {
  convertTemplateConfigToStreamConfig
};
