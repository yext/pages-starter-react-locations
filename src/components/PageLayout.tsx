import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children?: React.ReactNode;
};

const PageLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen">
      <Header />
      {children}
      <Footer ></Footer>
    </div>
  );
};

export default PageLayout;
