import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children?: React.ReactNode;
  _site?: any;
};

const PageLayout = ({ children, _site }: Props) => {
  return (
    <div className="min-h-screen">
      <Header _site={_site} />
        {children}
      <Footer _site={_site} />
    </div>
  );
};

export default PageLayout;
