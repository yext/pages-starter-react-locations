import { RequestHandler } from "express-serve-static-core";
declare type Props = {
    dynamicGenerateData: boolean;
    displayGenerateTestDataWarning: boolean;
};
export declare const indexPage: ({ dynamicGenerateData, displayGenerateTestDataWarning, }: Props) => RequestHandler;
export {};
