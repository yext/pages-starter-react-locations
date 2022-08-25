import { RequestHandler } from "express-serve-static-core";
import { ViteDevServer } from "vite";
import { ProjectStructure } from "../../../common/src/project/structure.js";
declare type Props = {
    vite: ViteDevServer;
    dynamicGenerateData: boolean;
    projectStructure: ProjectStructure;
};
export declare const serverRenderRoute: ({ vite, dynamicGenerateData, projectStructure }: Props) => RequestHandler;
export {};
