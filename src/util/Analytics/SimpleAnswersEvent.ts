import { provideAnalytics } from "@yext/analytics";

const sampleConfig = {
  experienceKey: 'yext-inventory',
  experienceVersion: 'PRODUCTION',
  businessId: 2987593,
};

export class SimpleAnswersEvent {
  analytics: any;

  constructor(config = sampleConfig) {
    this.analytics = provideAnalytics(config);
  }

  fire() {
    this.analytics.report({
      type: 'CTA_CLICK',
      entityId: '8055',
      queryId: '01811f7b-7c42-3f1c-60ce-340903a66427',
      verticalKey: 'sites',
      searcher: 'VERTICAL',
    });
  }
}