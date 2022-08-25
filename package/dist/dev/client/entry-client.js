import * as ReactDOM from "react-dom";
import * as React from "react";
const hydrate = async () => {
  const templates = import.meta.glob("/src/templates/*.(jsx|tsx)");
  const routes = Object.keys(templates).map((path) => {
    return {
      name: path.split("/").pop()?.split(".")[0] || "index",
      path,
      getComponent: templates[path]
    };
  });
  const templateFilename = window._RSS_TEMPLATE_;
  const templateFilenameWithoutSuffix = templateFilename?.split(".")[0];
  const template = routes.find(
    (route) => route.name === templateFilenameWithoutSuffix
  ) || {
    name: templateFilename?.split(".")[0],
    path: `/src/templates/${templateFilename}`,
    getComponent: function() {
      throw new Error("Function not implemented.");
    }
  };
  const { default: Component } = await template.getComponent();
  if (!Component) {
    console.error("Default export missing in template: " + template.path);
    return;
  }
  ReactDOM.hydrate(
    /* @__PURE__ */ React.createElement(Component, {
      ...window._RSS_PROPS_
    }),
    document.getElementById("root")
  );
};
hydrate();
