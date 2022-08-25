import { ViteDevServer } from "vite";
import { TemplateModule } from "../../../common/src/template/types.js";
export declare const loadTemplateModule: (devserver: ViteDevServer, templateFilepath: string) => Promise<TemplateModule<any, any>>;
