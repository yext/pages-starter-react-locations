import { getRuntime, isProduction } from "../../util";
import {
  CookieManager,
  providePagesAnalytics
} from "@yext/analytics";
import { slugify } from "./helpers";
class Analytics {
  constructor(templateData, requireOptIn) {
    this.templateData = templateData;
    this._optedIn = !requireOptIn;
    this.makeReporter();
    this.pageView();
  }
  _optedIn;
  _conversionTrackingEnabled = false;
  _cookieManager;
  _analyticsReporter;
  _pageViewFired = false;
  _enableDebugging = false;
  calculatePageType() {
    const isStaticPage = !!this.templateData.document?.__?.staticPage;
    const isEntityPage = !!this.templateData.document?.__?.entityPageSet;
    let pageType;
    if (isStaticPage) {
      pageType = {
        name: "static",
        staticPageId: this.templateData.document.__.name
      };
    } else if (isEntityPage) {
      pageType = {
        name: "entity",
        pageSetId: this.templateData.document.__.name,
        id: this.templateData.document.uid
      };
    } else {
      throw new Error("invalid document type");
    }
    return pageType;
  }
  makeReporter() {
    if (getRuntime().name !== "browser") {
      return;
    }
    if (!this._optedIn) {
      return;
    }
    const inProduction = isProduction(this.templateData?.document?.siteInternalHostName) || isProduction(this.templateData?.document?.siteDomain);
    this._analyticsReporter = providePagesAnalytics({
      businessId: this.templateData.document.businessId,
      pageType: this.calculatePageType(),
      pageUrl: window.location.href,
      production: inProduction,
      referrer: document.referrer,
      siteId: this.templateData.document.siteId
    });
    this.setDebugEnabled(this._enableDebugging);
  }
  canTrack() {
    return getRuntime().name === "browser" && this._optedIn && !!this._analyticsReporter;
  }
  setupConversionTracking() {
    this._cookieManager = new CookieManager();
    this._analyticsReporter?.setConversionTrackingEnabled(
      true,
      this._cookieManager.setAndGetYextCookie()
    );
  }
  enableTrackingCookie() {
    this._conversionTrackingEnabled = true;
    if (this.canTrack()) {
      this.setupConversionTracking();
    }
  }
  identify(visitor) {
    if (this.canTrack()) {
      this._analyticsReporter?.setVisitor(visitor);
    }
  }
  async optIn() {
    this._optedIn = true;
    this.makeReporter();
    if (this._conversionTrackingEnabled && !this._cookieManager) {
      this.setupConversionTracking();
    }
    if (!this._pageViewFired) {
      await this.pageView();
    }
  }
  async pageView() {
    if (!this.canTrack()) {
      return Promise.resolve(void 0);
    }
    await this._analyticsReporter?.pageView();
    this._pageViewFired = true;
  }
  async track(eventName, conversionData) {
    if (!this.canTrack()) {
      return Promise.resolve();
    }
    await this._analyticsReporter?.track(
      { eventType: slugify(eventName) },
      conversionData
    );
  }
  setDebugEnabled(enabled) {
    this._enableDebugging = enabled;
    this._analyticsReporter?.setDebugEnabled(enabled);
  }
  trackClick(eventName, conversionData) {
    return (e) => {
      if (!this.canTrack()) {
        return Promise.resolve();
      }
      if (e.target === null || e.defaultPrevented) {
        return this.track(eventName, conversionData);
      }
      const targetLink = e.target;
      if (targetLink.href === null || targetLink.href === void 0) {
        return this.track(eventName, conversionData);
      }
      const linkUrl = new URL(targetLink.href);
      if (linkUrl.protocol === "mailto:" || linkUrl.protocol === "tel:" || linkUrl.protocol === "javascript:" || linkUrl.hostname === window.location.hostname) {
        return this.track(eventName, conversionData);
      }
      const targetBlankOrSimilar = targetLink.target && !targetLink.target.match(/^_(self|parent|top)$/i) || e.ctrlKey || e.shiftKey || e.metaKey;
      if (targetBlankOrSimilar) {
        return this.track(eventName, conversionData);
      }
      e.preventDefault();
      const navigate = () => {
        window.location.href = linkUrl.toString();
      };
      const awaitTimeout = new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1e3);
      });
      return Promise.race([
        this.track(eventName, conversionData),
        awaitTimeout
      ]).then(navigate);
    };
  }
}
export {
  Analytics
};
