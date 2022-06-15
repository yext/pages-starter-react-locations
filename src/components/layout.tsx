import * as React from "react";
import "../index.css";

type Props = {
  //Insert Props Here
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <div className="max-w-screen-sm mx-auto my-4 lg:my-8">{children}</div>;
};

export default Layout;
