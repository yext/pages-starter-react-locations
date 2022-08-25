import { PropsWithChildren } from "react";
import { AnalyticsScopeProps } from "./interfaces";
/**
 * The useScope hook will return the current scope from the Analytics Scope. For
 * use within the context of an AnalyticsScopeProvider for scoping analytics events.
 */
export declare const useScope: () => string;
/**
 * The AnalyticsScopeProvider will allow you to pre-pend a given string to all
 * events that happen in the node tree below where setScope is called.
 * For example, if you call setScope('header') and there is an `a` element
 * below whose onClick calls `track('my link')` the calculated event name
 * that will be sent to Yext Analytics is `header_mylink`
 *
 * @param props - AnalyticsScopeProps
 */
export declare function AnalyticsScopeProvider(props: PropsWithChildren<AnalyticsScopeProps>): JSX.Element;
