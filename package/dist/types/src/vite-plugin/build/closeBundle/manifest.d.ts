import { ProjectStructure } from "../../../common/src/project/structure.js";
import { TemplateModuleCollection } from "../../../common/src/template/internal/loader.js";
/**
 * Creates a manifest.json for use with the Pages vite-plugin
 * @param featureNameToBundlePath a mapping of featureName to bundle paths registered to that
 * feature.
 */
export declare const generateManifestFile: (templateModules: TemplateModuleCollection, projectStructure: ProjectStructure) => void;
