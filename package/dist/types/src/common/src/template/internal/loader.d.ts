import { TemplateModuleInternal } from "./types.js";
/**
 * Loads all templates in the project.
 * @param templateModulePaths the templates filepaths to load as modules
 * @param transpile set to true if the templates need to be transpiled (such as when they are in tsx format)
 * @param adjustForFingerprintedAsset removes the fingerprint portion (for server bundles)
 * @returns Promise<{@link TemplateModuleCollection}>
 */
export declare const loadTemplateModules: (templateModulePaths: string[], transpile: boolean, adjustForFingerprintedAsset: boolean) => Promise<TemplateModuleCollection>;
export declare type TemplateModuleCollection = Map<string, TemplateModuleInternal<any, any>>;
