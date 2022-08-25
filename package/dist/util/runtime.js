class Runtime {
  name;
  version;
  constructor() {
    if (typeof process !== "undefined") {
      this.name = "node";
      this.version = process.versions.node;
    } else if (typeof window !== "undefined" && !("Deno" in window)) {
      this.name = "browser";
      this.version = navigator.userAgent;
    } else {
      this.name = "deno";
      this.version = window?.Deno?.version.deno || "";
    }
  }
  getNodeMajorVersion() {
    if (this.name != "node") {
      throw new Error("Not running in Node.");
    }
    return +this.version.split(".")[0];
  }
}
const getRuntime = () => {
  return new Runtime();
};
export {
  getRuntime
};
