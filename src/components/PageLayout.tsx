import * as React from "react";
import BreadCrumbs, { BreadcrumbItem } from "./BreadCrumbs";
import Img, { Image } from "./Img";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
    title?: string;
    _site?: any;
    children?: React.ReactNode;
};
  
  const PageLayout = ({
    title,
    _site,
    children,
  }: Props) => {
    return (
        <div className="min-h-screen">
            <Header _site={_site} />
                {children}
            <Footer _site={_site}></Footer>
        </div>
    );
  };

export default PageLayout;
  