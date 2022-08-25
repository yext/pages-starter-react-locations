import { PropsWithChildren } from "react";
import { AnalyticsProviderProps } from "./interfaces";
/**
 * The main Analytics component for you to use. Sets up the proper react context
 * and bootstraps the Analytics reporter.
 *
 * @param props - A PropsWithChildren that implements AnalyticsProviderProps
 *
 * @public
 */
export declare function AnalyticsProvider(props: PropsWithChildren<AnalyticsProviderProps>): JSX.Element;
