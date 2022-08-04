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
    $id: "cities",
    filter: {
        savedFilterIds: ["dm_us-directory_address_city"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
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
  return `${document.id.toString()}`;
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
    ],
  };
};

 const City: Template<TemplateRenderProps> = ({relativePrefixToRoot, path, document}) => {
  const {
    _site,
    name,
    slug,
    dm_directoryParents,
    dm_directoryChildren
  } = document;

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
        </div>
      </PageLayout>
    </>
  );
};

export default City;
