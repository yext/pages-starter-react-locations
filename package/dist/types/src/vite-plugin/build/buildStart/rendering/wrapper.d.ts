import { TemplateModuleInternal } from "../../../../common/src/template/internal/types.js";
import { TemplateRenderProps, GetHeadConfig } from "../../../../common/src/template/types.js";
export declare const reactWrapper: <T extends TemplateRenderProps>(props: T, templateModuleInternal: TemplateModuleInternal<any, any>, template: string, hydrate: boolean, getHeadConfig?: GetHeadConfig<any>) => string;
