import * as React from "react";
import PageLayout from "../components/PageLayout";
import Banner from "../components/banner";
import BreadCrumbs from "../components/BreadCrumbs";
import "../index.css";
import {
  Template,
  GetPath,
  GetRedirects,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
 
 
export const config: TemplateConfig = {
  stream: {
    $id: "root",
    filter: {
      savedFilterIds: ["dm_us-directory"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildrenCount",
      "dm_directoryChildren.c_addressRegionDisplayName",
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};
 
 
export const getPath: GetPath<TemplateProps> = ({document}) => {
    return `index.html`;
 };
 
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({relativePrefixToRoot, path, document}): HeadConfig => {
  return {
    title: "Home Page",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          description: "This is a description for the Turtlehead Tacos directory home page.",
        },
      },
    ],
  };
};

  const Index: Template<TemplateRenderProps> = ({relativePrefixToRoot, path, document}) => {
  const {
    dm_directoryChildren    
  } = document;

  var sortedChildren = dm_directoryChildren.sort(function(a:any, b:any) {
    var a = a.name, b = b.name;
    return (a < b) ? -1 :(a > b) ? 1 : 0;
  });
  const childrenDivs = dm_directoryChildren.map((entity:any) => (
    <div>
      <a key="uRL" href={relativePrefixToRoot + entity.slug} className="font-bold text-2xl text-blue-700 hover:underline">
        {entity.c_addressRegionDisplayName} ({entity.dm_directoryChildrenCount})
      </a>
    </div>
  ));


   return (
    <>
      <PageLayout>
        <Banner text="Turtlehead Tacos"></Banner>
        <div className="centered-container bg-pink-500">
          <BreadCrumbs name="Home" baseUrl={relativePrefixToRoot}></BreadCrumbs>
          <div className="section space-y-14 px-10">
              <h1 className="text-center">Turtlehead Tacos Locations</h1>
              <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
                {childrenDivs}
              </div>
          </div>
        </div>
      </PageLayout>
    </>
   );
 };
 
 export default Index;
 