/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  TransformProps,
} from "@yext/pages";
import * as React from "react";
import { fetch } from "@yext/pages/util";
import Banner from "../components/banner";
import Details from "../components/details";
import Hours from "../components/hours";
import List from "../components/list";
import PageLayout from "../components/page-layout";
import StaticMap from "../components/static-map";
import Favicon from "../public/yext-favicon.ico";
import { ExternalWeather } from "../types/ExternalWeather";
import "../index.css";
import Cta from "../components/cta";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-1",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "description",
      "hours",
      "slug",
      "geocodedCoordinate",
      "services",
      "c_coverPhoto",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["location"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * A local type for transformProps. This could live in src/types but it's generally
 * best practice to keep unshared types local to their usage.
 */
type LocationData = TemplateProps & { externalWeather: ExternalWeather };

/**
 * Used to either alter or augment the props passed into the template at render time.
 * This function will be run during generation and pass in directly as props to the default
 * exported function.
 *
 * This can be used when data needs to be retrieved from an external (non-Knowledge Graph)
 * source. This example calls a public API and returns the data.
 *
 * If the page is truly static this function is not necessary.
 */
export const transformProps: TransformProps<LocationData> = async (data) => {
  const coords = data.document.geocodedCoordinate;
  const url =
    import.meta.env.YEXT_PUBLIC_EXTERNAL_WEATHER_API_BASE_URL +
    `&latitude=${coords?.latitude}&longitude=${coords?.longitude}`;
  const externalWeather = (await fetch(url).then((res: any) =>
    res.json()
  )) as ExternalWeather;
  return { ...data, externalWeather };
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : `${document.locale}/${document.address.region}/${document.address.city}/${
        document.address.line1
      }-${document.id.toString()}`;
};

type LocationRenderData = TemplateRenderProps & {
  externalWeather: ExternalWeather;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
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
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
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
const Location: Template<LocationRenderData> = ({
  relativePrefixToRoot,
  path,
  document,
  externalWeather,
}: LocationRenderData) => {
  const {
    _site,
    name,
    address,
    openTime,
    hours,
    mainPhone,
    geocodedCoordinate,
    services,
    description,
    c_coverPhoto,
  } = document;

  const currentTemperture = externalWeather.current_weather?.temperature
    ? Math.round(externalWeather.current_weather?.temperature * 1.8 + 32)
    : null;

  const coverPhoto = c_coverPhoto ? c_coverPhoto : _site?.c_coverPhoto;

  return (
    <>
      <PageLayout>
        <Banner coverPhoto={coverPhoto}>
          <div>
            <h1 className="text-white text-3xl font-semibold">{name}</h1>
            {address && (
              <p className="text-lg pt-2 text-white font-semibold">
                <span>
                  {address.line1} in {address.city}, {address.region}
                </span>
              </p>
            )}
            {currentTemperture && (
              <p className="text-lg pt-2 text-white font-semibold">
                {`Current Temperature: ${currentTemperture}\u00B0F`}
              </p>
            )}
          </div>
          <div className="flex pt-4 justify-between">
            <Cta
              buttonText="Order Pickup"
              url="#"
              style="text-orange bg-white shadow-xl"
            ></Cta>
            <Cta
              buttonText="Order Delivery"
              url="#"
              style="text-orange bg-white shadow-xl"
            ></Cta>
          </div>
        </Banner>
        <div className="centered-container">
          <div className="section">
            <div className="grid grid-cols-2 gap-x-10 gap-y-10">
              <div className="bg-gray-100 p-2">
                <Details address={address} phone={mainPhone}></Details>
                {services && <List list={services}></List>}
              </div>
              <div className="bg-gray-100 p-2">
                {hours && <Hours title={"Restaurant Hours"} hours={hours} />}
              </div>
              {geocodedCoordinate && (
                <StaticMap
                  latitude={geocodedCoordinate.latitude}
                  longitude={geocodedCoordinate.longitude}
                ></StaticMap>
              )}
              <div className="bg-gray-100 p-2">
                <div className="text-xl font-semibold">{`About ${name}`}</div>
                <p className="pt-4">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Location;
