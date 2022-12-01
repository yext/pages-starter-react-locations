import * as React from "react";
import Header from "./header";
import Footer from "./footer";

type Props = {
  children?: React.ReactNode;
};

const PageLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col justify-start">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default PageLayout;
