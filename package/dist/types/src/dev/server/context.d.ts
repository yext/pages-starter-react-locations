/// <reference types="react" />
import { Page } from "./ssr/types.js";
/**
 * TODO (SUMO-4392) - document.
 *
 * @public
 */
declare type Route = {
    name: string;
    path: string;
    getComponent: () => Promise<any>;
};
/**
 * TODO (SUMO-4392) - document.
 *
 * @public
 */
export declare const routes: Route[];
declare type ReactSitesScriptsContextType = {
    activePage: Page | undefined;
    setActivePage: (page: Page) => void;
};
/**
 * TODO (SUMO-4392) - document.
 *
 * @public
 */
export declare const ReactSitesContext: import("react").Context<ReactSitesScriptsContextType>;
/**
 * TODO (SUMO-4392) - document.
 *
 * @public
 */
export declare const useReactSitesScripts: () => {
    navigate: (to: string) => Promise<void>;
};
export {};
