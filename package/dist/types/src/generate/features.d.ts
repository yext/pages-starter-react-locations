import { TemplateModuleCollection } from "../common/src/template/internal/loader.js";
export declare const features: () => Promise<void>;
/**
 * Generates a features.json from the templates.
 */
export declare const createFeaturesJson: (templateModules: TemplateModuleCollection, featurePath: string) => Promise<void>;
