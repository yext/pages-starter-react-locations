import { ViteDevServer } from "vite";
import { FeaturesConfig } from "../../../common/src/feature/features.js";
import React from "react";
import { ProjectStructure } from "../../../common/src/project/structure.js";
declare type PageLoaderValues = {
    url: string;
    vite: ViteDevServer;
    templateFilename: string;
    entityId: string;
    locale: string;
    featuresConfig: FeaturesConfig;
    dynamicGenerateData: boolean;
    projectStructure: ProjectStructure;
};
export declare type PageLoaderResult = {
    template: string;
    Component: React.FC;
    props: any;
};
export declare const pageLoader: ({ url, vite, templateFilename, entityId, locale, featuresConfig, dynamicGenerateData, projectStructure, }: PageLoaderValues) => Promise<PageLoaderResult>;
export {};
