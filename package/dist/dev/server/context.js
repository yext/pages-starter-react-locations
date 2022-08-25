import { createContext, useContext } from "react";
const templates = import.meta.glob("/src/templates/*.(jsx|tsx)");
const routes = Object.keys(templates).map((path) => {
  return {
    name: path.split("/").pop()?.split(".")[0] || "index",
    path,
    getComponent: templates[path]
  };
});
const ReactSitesContext = createContext(
  {}
);
const getServerData = async (to) => {
  const res = await fetch(`/data/${to}`);
  return await res.json();
};
const useReactSitesScripts = () => {
  const { setActivePage } = useContext(ReactSitesContext);
  return {
    navigate: async (to) => {
      const [props, { default: component }] = await Promise.all([
        getServerData(to),
        await routes.find((route) => route.path === to)?.getComponent()
      ]);
      setActivePage({ path: to, component, props });
      history.pushState(null, "", to);
    }
  };
};
export {
  ReactSitesContext,
  routes,
  useReactSitesScripts
};
