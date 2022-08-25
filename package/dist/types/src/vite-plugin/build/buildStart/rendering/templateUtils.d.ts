import { TemplateProps, Manifest } from "../../../../common/src/template/types.js";
import { TemplateModuleInternal } from "../../../../common/src/template/internal/types.js";
/**
 * @returns an array of template modules matching the document's feature.
 */
export declare const readTemplateModules: (feature: string, manifest: Manifest) => Promise<TemplateModuleInternal<any, any>>;
export declare type GeneratedPage = {
    path: string;
    content?: string;
    redirects: string[];
};
/**
 * Takes in both a template module and its stream document, processes them, and writes them to disk.
 *
 * @param templateModuleInternal
 * @param templateProps
 */
export declare const generateResponses: (templateModuleInternal: TemplateModuleInternal<any, any>, templateProps: TemplateProps) => Promise<GeneratedPage>;
