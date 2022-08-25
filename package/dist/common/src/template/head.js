import pc from "picocolors";
const renderHeadConfigToString = (headConfig) => {
  return `<title>${headConfig.title ? headConfig.title : "Yext Pages Site"}</title>
    <meta charset="${headConfig.charset || "UTF-8"}">
    <meta name="viewport" content="${headConfig.viewport || "width=device-width, initial-scale=1"}">
    ${headConfig.tags ? headConfig.tags.map(renderTag).join("\n") : ""}
    ${headConfig.other ? headConfig.other : ""}`.split("\n").filter((line) => line.trim() != "").join("\n");
};
const renderTag = (tag) => {
  switch (tag.type) {
    case "base":
    case "link":
    case "meta":
      return `<${tag.type} ${renderAttributes(tag.attributes)}>`;
    case "style":
    case "script":
    case "noscript":
    case "template":
      return `<${tag.type} ${renderAttributes(tag.attributes)}></${tag.type}>`;
    default: {
      console.log(
        pc.yellow(
          `[WARNING]: Tag type ${tag.type} is unsupported by the Tag interface. Please use "other" to render this tag.`
        )
      );
      return "";
    }
  }
};
const renderAttributes = (attributes) => {
  return Object.keys(attributes).map((key) => {
    return `${key}="${attributes[key]}"`;
  }).join(" ");
};
const getLang = (headConfig, props) => {
  if (!!headConfig?.lang) {
    return headConfig.lang;
  }
  if (!!props?.document?.locale) {
    return props?.document?.locale;
  }
  return "en";
};
export {
  getLang,
  renderHeadConfigToString
};
