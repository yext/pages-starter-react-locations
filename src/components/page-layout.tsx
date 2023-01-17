import * as React from "react";
import Header from "./header";
import Footer from "./footer";

type Props = {
  children?: React.ReactNode;
};

const PageLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default PageLayout;
