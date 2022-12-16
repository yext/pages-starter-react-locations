import * as React from "react";
import Banner from "../components/banner";
import Cta from "../components/cta";
import Address from "../components/Address";
import PhotoGallery from "../components/PhotoGallery";
import Hours from "../components/hours";
import Faqs from "../components/Faqs";
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
    $id: "locations",
    filter: {
      savedFilterIds: ["685381454"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "description",
      "neighborhood",
      "hours",
      "photoGallery",
      "slug",
      "paymentOptions",
      "geocodedCoordinate",
      "services",
      "covidMessaging",
      "c_featuredFAQs.id",
      "c_featuredFAQs.question",
      "c_featuredFAQs.answer",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta",
      "dm_directoryParents.c_addressRegionDisplayName",
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({document}) => {
  return document.slug;
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document
}): HeadConfig => {
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

 const Location: Template<TemplateRenderProps> = ({
    relativePrefixToRoot,
    path,
    document,
    __meta
  }) => {
  const {
    _site,
    name,
    address,
    description,
    neighborhood,
    openTime,
    hours,
    mainPhone,
    photoGallery,
    geocodedCoordinate,
    services,
    covidMessaging,
    c_featuredFAQs,
    dm_directoryParents,
    paymentOptions
  } = document;

  var formattedPhone = formatPhoneNumber(mainPhone);

  return (
    <>
      <PageLayout _site={_site} templateData={{__meta, document}}>
        <div className="centered-container">
          <BreadCrumbs name={name} parents={dm_directoryParents} baseUrl={relativePrefixToRoot} />
          <div className="section">
              <div className="grid md:grid-cols-2 lg:grid-cols-3">
                <div className="address-phone space-y-5">
                  <h2 className="text-xl font-semibold mb-4">Address</h2>
                  <Address address={address} />
                  <div className="space-x-3">
                    <span>&#128222;</span>
                    <span>{formattedPhone}</span>
                  </div>
                </div>
                <Hours title="Hours" hours={hours} />
                <div className="description">
                  <div className="text-xl font-semibold mb-4">About {name} - {neighborhood}</div>
                  <p>{description}</p>
                </div>
              </div>
          </div>
          <PhotoGallery photoGallery={photoGallery} />
          <Faqs faqs={c_featuredFAQs} />
          <Banner text="Location Page"/>
        </div>
      </PageLayout>
    </>
  );
};

export default Location;