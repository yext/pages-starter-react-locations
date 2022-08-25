import { ConversionDetails, Visitor } from "@yext/analytics";
import { AnalyticsMethods } from "./interfaces";
declare global {
    interface Window {
        setAnalyticsOptIn: () => void;
    }
}
/**
 * The useAnalytics hook can be used anywhere in the tree below a configured
 * AnalyticsProvider.  Calling it will return an object to give you access to
 * the analytics convenience methods for use in your components,
 * such as track(), pageView(), optIn() etc.
 *
 * @public
 */
export declare function useAnalytics(): AnalyticsMethods;
/**
 * Simpler hook that just returns the analytics track() method.
 *
 * @public
 */
export declare const useTrack: () => (eventName: string, conversionData?: ConversionDetails | undefined) => Promise<void>;
/**
 * Simpler hook that just returns returns the analytics pageView method
 *
 * @public
 */
export declare const usePageView: () => () => Promise<void>;
/**
 * Simpler hook that just returns the analytics identify method
 *
 * @public
 */
export declare const useIdentify: () => (visitor: Visitor) => void;
