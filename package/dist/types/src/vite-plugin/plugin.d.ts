import { PluginOption } from "vite";
import { Optional, ProjectStructureConfig } from "../common/src/project/structure.js";
/**
 * Options to configure functionality of the plugin.
 *
 * @public
 */
export declare type Options = {
    projectStructureConfig?: Optional<ProjectStructureConfig>;
};
declare const plugin: (opts?: Options) => PluginOption[];
export default plugin;
export { plugin as yextSSG };
