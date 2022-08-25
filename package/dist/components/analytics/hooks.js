import { useContext } from "react";
import { AnalyticsContext } from "./context";
import { concatScopes } from "./helpers";
import { useScope } from "./scope";
function useAnalytics() {
  const ctx = useContext(AnalyticsContext);
  if (!ctx) {
    throw new Error(
      "Attempted to call useAnalytics outside of an AnalyticsProvider"
    );
  }
  if (!window.setAnalyticsOptIn) {
    window.setAnalyticsOptIn = async () => {
      await ctx.optIn();
    };
  }
  const scope = useScope();
  return {
    trackClick(eventName, conversionData) {
      return ctx.trackClick(concatScopes(scope, eventName), conversionData);
    },
    setDebugEnabled(enabled) {
      return ctx.setDebugEnabled(enabled);
    },
    enableTrackingCookie() {
      return ctx.enableTrackingCookie();
    },
    identify(visitor) {
      return ctx.identify(visitor);
    },
    optIn() {
      return ctx.optIn();
    },
    pageView() {
      return ctx.pageView();
    },
    track(eventName, conversionData) {
      return ctx.track(concatScopes(scope, eventName), conversionData);
    }
  };
}
const useTrack = () => {
  return useAnalytics().track;
};
const usePageView = () => {
  return useAnalytics().pageView;
};
const useIdentify = () => {
  return useAnalytics().identify;
};
export {
  useAnalytics,
  useIdentify,
  usePageView,
  useTrack
};
