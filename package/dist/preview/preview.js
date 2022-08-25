import shell from "shelljs";
var preview_default = () => shell.exec("vite preview");
export {
  preview_default as default
};
