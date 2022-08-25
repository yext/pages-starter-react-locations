import * as React from "react";
import { useRef } from "react";
import { getRuntime } from "../../util";
import { Analytics } from "./Analytics";
import { AnalyticsContext } from "./context";
function AnalyticsProvider(props) {
  const {
    children,
    requireOptIn,
    enableTrackingCookie,
    enableDebugging,
    templateData
  } = props;
  const analyticsRef = useRef(null);
  if (analyticsRef.current === null) {
    analyticsRef.current = new Analytics(templateData, requireOptIn);
  }
  const analytics = analyticsRef.current;
  if (enableTrackingCookie) {
    analytics.enableTrackingCookie();
  }
  if (enableDebugging || debuggingParamDetected()) {
    analytics.setDebugEnabled(true);
  }
  return /* @__PURE__ */ React.createElement(AnalyticsContext.Provider, {
    value: analytics
  }, children);
}
function debuggingParamDetected() {
  if (getRuntime().name !== "browser") {
    return false;
  }
  if (typeof window === void 0) {
    return false;
  }
  const currentUrl = new URL(window.location.href);
  return !!currentUrl.searchParams.get("xYextDebug");
}
export {
  AnalyticsProvider
};
