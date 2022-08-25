import { Plugin } from "vite";
import { ProjectStructure } from "../../common/src/project/structure.js";
/**
 * This plugin defines how to build the project for production. It bundles
 * assets, copies Yext plugin files that execute the bundled assets in a Deno
 * environment, and puts them all in an output directory.
 */
export declare const build: (projectStructure: ProjectStructure) => Plugin;
