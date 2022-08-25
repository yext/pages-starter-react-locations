import path from "path";
const getRelativePrefixToRootFromPath = (path2) => {
  const pathComponents = path2.split("/");
  pathComponents.pop();
  return pathComponents.map((_) => "../").reduce((previousValue, currentValue) => previousValue + currentValue, "");
};
const convertToPosixPath = (p) => {
  return p.split(path.sep).join(path.posix.sep);
};
export {
  convertToPosixPath,
  getRelativePrefixToRootFromPath
};
