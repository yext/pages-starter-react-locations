import { TemplateConfigInternal } from "../template/internal/types.js";
import { StreamConfig } from "./stream.js";
/**
 * The shape of data that represents a features.json file, used by Yext Pages.
 */
export interface FeaturesConfig {
    /** The feature configurations */
    features: FeatureConfig[];
    /** The stream configurations */
    streams?: StreamConfig[];
}
/**
 * Converts a {@link TemplateConfigInternal} into a valid {@link FeaturesConfig} (features and streams).
 */
export declare const convertTemplateConfigInternalToFeaturesConfig: (config: TemplateConfigInternal) => FeaturesConfig;
interface FeatureConfigBase {
    name: string;
    streamId?: string;
    templateType: "JS";
    alternateLanguageFields?: string[];
}
interface EntityPageSetConfig extends FeatureConfigBase {
    entityPageSet: {
        plugin: {};
    };
}
interface StaticPageConfig extends FeatureConfigBase {
    staticPage: {
        plugin: {};
    };
}
/**
 * A single feature representation for a {@link FeaturesConfig.features}.
 */
export declare type FeatureConfig = EntityPageSetConfig | StaticPageConfig;
/**
 * Converts a {@link TemplateConfigInternal} into a valid single {@link FeatureConfig}.
 */
export declare const convertTemplateConfigToFeatureConfig: (config: TemplateConfigInternal) => FeatureConfig;
export {};
