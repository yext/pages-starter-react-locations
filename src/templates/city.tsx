import * as React from "react";
import Banner from "../components/banner";
import Address from "../components/Address";
import PageLayout from "../components/PageLayout";
import BreadCrumbs from "../components/BreadCrumbs";
import { formatPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input';
import Favicon from "../public/yext-favicon.ico";
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
    $id: "cities",
    filter: {
        savedFilterIds: ["dm_us-directory_address_city"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "description",
      "slug",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta",
      "dm_directoryParents.c_addressRegionDisplayName",
      "dm_directoryChildren.name",
      "dm_directoryChildren.address",
      "dm_directoryChildren.mainPhone",
      "dm_directoryChildren.slug"
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

 const City: Template<TemplateRenderProps> = ({
    relativePrefixToRoot,
    path,
    document,
    __meta
  }) => {
  const {
    _site,
    name,
    description,
    slug,
    dm_directoryParents,
    dm_directoryChildren
  } = document;

  var sortedChildren = dm_directoryChildren.sort(function(a:any, b:any) {
    var a = a.name;
    var b = b.name;
    return (a < b) ? -1 :(a > b) ? 1 : 0;
  });
  const childrenDivs = dm_directoryChildren.map((entity:any) => (
    <div className="border rounded-lg drop-shadow-md bg-gray-100 space-y-6 p-3 h-60">
      <h2>
        <a className="font-bold text-2xl text-blue-700 hover:underline" href={relativePrefixToRoot + entity.slug}>{entity.name}</a>
      </h2>
      <div className="m-1 border"></div>
      <Address address={entity.address}></Address>
      <div className="space-x-3">
        <span>&#128222;</span>
        <span>{formatPhoneNumber(entity.mainPhone)}</span>
      </div>
    </div>
  ));

  return (
    <>
      <PageLayout _site={_site} templateData={{__meta, document}}>
        <div className="centered-container">
          <BreadCrumbs name={name} parents={dm_directoryParents} baseUrl={relativePrefixToRoot}></BreadCrumbs>
          <div className="section space-y-14 px-10">
              <div className="space-y-6">
                <h1 className="text-center">Turtlehead Tacos Locations - {name}</h1>
                <p className="text-2xl text-center">{description}</p>
              </div>
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {childrenDivs}
              </div>
          </div>
          <Banner text="City Page"/>
        </div>
      </PageLayout>
    </>
  );
};

export default City;
