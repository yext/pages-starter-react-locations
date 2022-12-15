import * as React from "react";
import Img, { Image } from "./Img";
import Header from "./header";
import Footer from "./footer";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider
} from "@yext/pages/components";
import { TemplateProps } from "@yext/pages";

type Props = {
    title?: string;
    _site?: any;
    templateData: TemplateProps;
    children?: React.ReactNode;
};
  
  const PageLayout = ({
    title,
    _site,
    children,
    templateData
  }: Props) => {
    return (
      <AnalyticsProvider templateData={templateData}>
        <div className="min-h-screen">
            <AnalyticsScopeProvider name={"header"}>
              <Header _site={_site}/>
            </AnalyticsScopeProvider>
                {children}
            <AnalyticsScopeProvider name={"footer"}>
              <Footer />
            </AnalyticsScopeProvider>
        </div>
      </AnalyticsProvider>
    );
  };

export default PageLayout;
  