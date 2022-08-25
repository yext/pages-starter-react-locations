import { Template, GetHeadConfig, GetPath, GetRedirects, TransformProps, Render, Stream, TemplateModule, TemplateProps, TemplateRenderProps } from "../types.js";
/**
 * A domain representation of a template module. Contains all fields from an imported module as well
 * as metadata about the module used in downstream processing.
 */
export interface TemplateModuleInternal<T extends TemplateProps, U extends TemplateRenderProps> {
    /**
     * The filepath to the template file. This can be the raw TSX file when used during dev mode or
     * the path to the server bundle this module was imported from during prod build.
     */
    path: string;
    /** The name of the file (with extension) */
    filename: string;
    /** The name of the file (without extension) */
    templateName: string;
    /** The exported config function */
    config: TemplateConfigInternal;
    /** The optional exported transformProps function */
    transformProps?: TransformProps<T>;
    /** The exported getPath function */
    getPath: GetPath<T>;
    /** The exported, optional headFunction */
    getHeadConfig?: GetHeadConfig<U>;
    /** The exported, optional, function which returns a list of redirects */
    getRedirects?: GetRedirects<U>;
    /** The exported render function */
    render?: Render<U>;
    /** The exported default template function */
    default?: Template<U>;
}
/**
 * The exported `config` function's definition.
 */
export interface TemplateConfigInternal {
    /** The name of the template feature. If not defined uses the template filename (without extension) */
    name: string;
    /** The stream that this template uses. If a stream is defined the streamId is not required. */
    streamId?: string;
    /** The stream configuration used by the template */
    stream?: Stream;
    /** The specific fields to add additional language options to based on the stream's localization */
    alternateLanguageFields?: string[];
}
export declare const convertTemplateModuleToTemplateModuleInternal: (templateFilepath: string, templateModule: TemplateModule<any, any>, adjustForFingerprintedAsset: boolean) => TemplateModuleInternal<any, any>;
