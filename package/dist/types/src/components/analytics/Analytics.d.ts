import { TemplateProps } from "../../common/src/template/types";
import { AnalyticsMethods } from "./interfaces";
import { ConversionDetails, Visitor } from "@yext/analytics";
/**
 * The Analytics class creates a stateful facade in front of the \@yext/analytics
 * Library's pagesAnalyticsProvider class. It takes in some data from the
 * template configuration and uses it to provide configuration to the
 * pagesAnalyticsProvider.
 *
 * Additionally, it provides handlers for controlling user opt-in for compliance
 * requirements as well as for debugging, enabling conversion tracking, saving
 * user identity information, and creating named analytics scopes for
 * easy tagging.
 *
 * @public
 */
export declare class Analytics implements AnalyticsMethods {
    private templateData;
    private _optedIn;
    private _conversionTrackingEnabled;
    private _cookieManager;
    private _analyticsReporter;
    private _pageViewFired;
    private _enableDebugging;
    /**
     * Creates an Analytics instance, will fire a pageview event if requireOptin
     * is false
     *
     * @param templateData - template data object from the pages system
     * @param requireOptIn - boolean, set to true if you require user opt in before tracking analytics
     */
    constructor(templateData: TemplateProps, requireOptIn?: boolean | undefined);
    private calculatePageType;
    private makeReporter;
    private canTrack;
    private setupConversionTracking;
    /** {@inheritDoc AnalyticsMethods.enableConversionTracking} */
    enableTrackingCookie(): void;
    /** {@inheritDoc AnalyticsMethods.identify} */
    identify(visitor: Visitor): void;
    /** {@inheritDoc AnalyticsMethods.async} */
    optIn(): Promise<void>;
    /** {@inheritDoc AnalyticsMethods.async} */
    pageView(): Promise<void>;
    /** {@inheritDoc AnalyticsMethods.track} */
    track(eventName: string, conversionData?: ConversionDetails): Promise<void>;
    /** {@inheritDoc AnalyticsMethods.setDebugEnabled} */
    setDebugEnabled(enabled: boolean): void;
    /** {@inheritDoc AnalyticsMethods.trackClick} */
    trackClick(eventName: string, conversionData?: ConversionDetails): (e: MouseEvent) => Promise<void>;
}
