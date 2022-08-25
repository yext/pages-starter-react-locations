import { ViteDevServer } from "vite";
import { TemplateModuleInternal } from "../../../common/src/template/internal/types.js";
export declare const featureNameToTemplateModuleInternal: (devserver: ViteDevServer, featureName: string) => Promise<TemplateModuleInternal<any, any> | null>;
