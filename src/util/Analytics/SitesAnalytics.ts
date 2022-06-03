export class SitesAnalytics {
  constructor() {

  }

  pageView () {
    fetch('https://www.yext-pixel.com/store_pagespixel?product=storepages&v=1654284374116&pageurl=%2Fmd&pagesReferrer=https%3A%2F%2Fbankers_amerisbank_com.yextpages.net%2F&businessids=3371543&siteId=31196&isStaging=true&directoryId=State%20-%20City%20Drilldown&directoryPath=MD&eventType=pageview',
    {
      mode: 'no-cors',
    })
      .then(data => console.log(data));
  }

  click () {
    fetch('https://www.yext-pixel.com/store_pagespixel?product=storepages&v=1654287242049&pageurl=%2Fmd%2Feldersburg%2Fbrenda-given&pagesReferrer=https%3A%2F%2Fbankers_amerisbank_com.yextpages.net%2Fmd%2Feldersburg&businessids=3371543&siteId=31196&isStaging=true&ids=34233156&pageSetId=Locations&eventType=hero_ctas_cta3',
    {
      mode: 'no-cors',
    })
      .then(data => console.log(data));
  }
}
