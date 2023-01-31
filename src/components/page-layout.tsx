import * as React from "react";
import Site from "../types/Site";
import Header from "./header";
import Footer from "./footer";
import {HelperTool} from "./helper-tool"

type Props = {
  _site: Site;
  children?: React.ReactNode;
  document: any;
};

const inProduction = !import.meta.env.DEV;

const PageLayout = ({ _site, children, document }: Props) => {
console.log(document)
  return (
    <div className="min-h-screen">
      <Header _site={_site} />
      {children}
      {!inProduction && (
              <HelperTool data={document}/>
            )}
      <Footer _site={_site}></Footer>
    </div>
  );
};

export default PageLayout;
