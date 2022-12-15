import * as React from "react";
import Banner from "../components/banner";
import PageLayout from "../components/PageLayout";
import BreadCrumbs from "../components/BreadCrumbs";
import "../index.css";
import Favicon from "../public/yext-favicon.ico";
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
    $id: "states",
    filter: {
      savedFilterIds: ["dm_us-directory_address_region"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "description",
      "c_addressRegionDisplayName",
      "slug",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta",
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildrenCount"
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({document}) => {
  return `${document.slug.toString()}`;
};

 export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({relativePrefixToRoot, path, document}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          description: document.description,
        },
      },
      {
        type: "link",
        attributes: {
          rel: 'icon',
          type: 'image/x-icon',
          href: Favicon
        },
      }
    ],
  };
};


 const State: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
  __meta
}) => {
  const {
    _site,
    name,
    description,
    c_addressRegionDisplayName,
    dm_directoryParents,
    dm_directoryChildren
  } = document;

  var sortedChildren = dm_directoryChildren.sort(function(a:any, b:any) {
    var a = a.name;
    var b = b.name;
    return (a < b) ? -1 :(a > b) ? 1 : 0;
  });
  
  const childrenDivs = dm_directoryChildren.map((entity:any) => (
    <div>
      <a key="uRL" href={relativePrefixToRoot + entity.slug} className="font-bold text-2xl text-blue-700 hover:underline">
        {entity.name} ({entity.dm_directoryChildrenCount})
      </a>
    </div>
  ));

  var updatedDescription;
  if (description.includes("United States")) {
    updatedDescription = description.replace("United States", "the United States");
  } else {
    updatedDescription = description;
  }

  return (
    <>
      <PageLayout _site={_site} templateData={{__meta, document}}>
        <div className="centered-container">
          <BreadCrumbs name={name} parents={dm_directoryParents} baseUrl={relativePrefixToRoot} />
          <div className="section space-y-14 px-10">
            <div className="space-y-6">
              <h1 className="text-center">Turtlehead Tacos Locations - {c_addressRegionDisplayName}</h1>
              <p className="text-2xl text-center">{updatedDescription}</p>
            </div>
              <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
                {childrenDivs}
              </div>
          </div>
          <Banner text="State Page"/>
        </div>
      </PageLayout>
    </>
  );
};

export default State;