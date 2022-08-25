import React from "react";
import { concatScopes } from "./helpers";
const ScopeContext = React.createContext({ name: "" });
const useScope = () => {
  const ctx = React.useContext(ScopeContext);
  return ctx.name;
};
function AnalyticsScopeProvider(props) {
  const parentScope = useScope();
  const combinedScope = concatScopes(parentScope, props.name);
  return /* @__PURE__ */ React.createElement(ScopeContext.Provider, {
    value: { name: combinedScope }
  }, props.children);
}
export {
  AnalyticsScopeProvider,
  useScope
};
