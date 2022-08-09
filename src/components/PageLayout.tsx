import * as React from "react";
import Img, { Image } from "./Img";
import Header from "./header";
import Footer from "./footer";

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
            <Header />
                {children}
            <Footer />
        </div>
    );
  };

export default PageLayout;
  