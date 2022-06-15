import {
  Data,
  Default,
  GetHeadConfig,
  GetPath,
} from "@yext/yext-sites-scripts";
import * as React from "react";
import Layout from "../components/layout";

export const getPath: GetPath<Data> = () => {
  return "404.html";
};

export const getHeadConfig: GetHeadConfig<Data> = () => {
  return {
    title: "404 - Page Not Found",
  };
};

const FourOhFour: Default<Data> = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
    </Layout>
  );
};

export default FourOhFour;
