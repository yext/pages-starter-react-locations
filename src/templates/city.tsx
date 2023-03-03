/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Pages system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import * as React from "react";
import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import { Address } from "@yext/pages/components";
import { isProduction } from "@yext/pages/util";
import "../index.css";
import Favicon from "../assets/images/yext-favicon.ico";
import About from "../components/About";
import Banner from "../components/Banner";
import Breadcrumbs from "../components/Breadcrumbs";
import Details from "../components/Details";
import Hours from "../components/Hours";
import PageLayout from "../components/PageLayout";
import StaticMap from "../components/StaticMap";
import EditTool from "../components/EditTool";
import { formatPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input';

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "city-stream",
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["ce_city"],
    },
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "description",
      "slug",
      "c_addressRegionDisplayName",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta",
      "dm_directoryParents.c_addressRegionDisplayName",
      "dm_directoryChildren.name",
      "dm_directoryChildren.address",
      "dm_directoryChildren.mainPhone",
      "dm_directoryChildren.slug"
    ],
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: To preview production URLs locally, you must return document.slug from this function
 * and ensure that each entity has the slug field pouplated.
 */
export const getPath: GetPath<TemplateProps> = ({document}) => {
  return `${document.slug.toString()}`;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`alias/${document.locale}/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and produce a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: Favicon,
        },
      },
    ],
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const City: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    name,
    description,
    slug,
    siteDomain,
    c_addressRegionDisplayName,
    dm_directoryParents,
    dm_directoryChildren
  } = document;

  let sortedChildren;
  let childrenDivs;
  if (dm_directoryChildren) {
        sortedChildren = dm_directoryChildren.sort(function(a:any, b:any) {
        a = a.name;
        b = b.name;
        return (a < b) ? -1 :(a > b) ? 1 : 0;
    });
        childrenDivs = dm_directoryChildren.map((entity:any) => (
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
  }

  return (
    <>
      <PageLayout>
        <Banner name={name} />
        <div className="centered-container">
          <Breadcrumbs name={name} parents={dm_directoryParents} baseUrl={relativePrefixToRoot} />
          <div className="section space-y-14 px-10">
              <div className="space-y-6">
                <h1 className="text-3xl font-semibold text-center">Turtlehead Tacos Locations - {name}</h1>
                <p className="text-2xl text-center">{description}</p>
              </div>
              {dm_directoryChildren && (
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {childrenDivs}
                </div>
              )}
          </div>
        </div>
      </PageLayout>
      {/* This component displays a link to the entity that represents the given page in the Knowledge Graph*/}
      {!isProduction(siteDomain) && <EditTool data={document} />}
    </>
  );
};

export default City;
