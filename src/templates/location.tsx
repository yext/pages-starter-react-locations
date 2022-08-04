import * as React from "react";
import Banner from "../components/Banner";
import Cta from "../components/Cta";
import Address from "../components/Address";
import PhotoGallery from "../components/PhotoGallery";
import Hours from "../components/Hours";
import Faqs from "../components/Faqs";
import PageLayout from "../components/PageLayout";
import { formatPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input';
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
      "geocodedCoordinate",
      "services",
      "covidMessaging",
      "c_featuredFAQs.question",
      "c_featuredFAQs.answer"
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
  return `${document.id.toString()}`;
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
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
    ],
  };
};


 const Location: Template<TemplateRenderProps> = ({relativePrefixToRoot, path, document}) => {
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
    c_featuredFAQs
  } = document;

  var formattedPhone = formatPhoneNumber(mainPhone);

  return (
    <>
      <PageLayout _site={_site} >
        <Banner text={name}>
          <div className="bg-white p-10 items-center text-center flex-col gap-y-4 rounded-lg drop-shadow-md">
            <div className="text-black text-base">Visit Us Today!</div>
            <Cta buttonText="Get Directions" url="http://google.com" style="primary-cta"/>
          </div>
        </Banner>
        <div className="centered-container">
          <div className="section">
              <div className="grid md:grid-cols-2 lg:grid-cols-3">
                <div className="address-phone space-y-5">
                  <h2 className="text-xl font-semibold mb-4">Address</h2>
                  <Address address={address}></Address>
                  <div className="space-x-3">
                    <span>&#128222;</span>
                    <span>{formattedPhone}</span>
                  </div>
                </div>
                <Hours title="Hours" hours={hours}></Hours>
                <div className="description">
                  <div className="text-xl font-semibold mb-4">About {name} - {neighborhood}</div>
                  <p>{description}</p>
                </div>
              </div>
          </div>
          <div className="section">
            <PhotoGallery 
              photoGallery={photoGallery}
              height="300"
              width="450"
              ></PhotoGallery>
          </div>
          <div className="section">
            <Faqs faqs={c_featuredFAQs}></Faqs>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Location;