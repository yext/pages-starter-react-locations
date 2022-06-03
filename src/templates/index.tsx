/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import * as React from "react";
import { SimpleAnswersEvent, SitesAnalytics } from "../util/Analytics";
import Banner from "../components/banner";
import Header, { Link } from "../components/header";
import Footer from "../components/footer";
import Cta from "../components/cta";
import Contact from "../components/contact";
import List from "../components/list";
import Hours from "../components/hours";
import StaticMap from "../components/static-map";
import { reactWrapper } from "../wrapper";
import { renderToString } from "react-dom/server";
import "../index.css";
import { Data } from "../types/data";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config = {
  // The name of the feature.
  // NOTE: A future change may remove this and the feature name would use the name of the template by default.
  name: "index",
  streamId: "my-stream-id",
  stream: {
    $id: "my-stream-id",
    // Required for now, but the plugin could set this automatically for you.
    source: "knowledgeGraph",
    // Required for now, but the plugin could set this automatically for you.
    destination: "pages",
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
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath = (data: Data) => {
  return `index/${data.document.streamOutput.id.toString()}`;
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
const Index: React.FC<Data> = (props) => {
  const { document } = props;
  const { streamOutput } = document;
  const {
    id,
    name,
    address,
    openTime,
    hours,
    mainPhone,
    _site,
    geocodedCoordinate,
    services,
  } = streamOutput;

  const links: Link[] = [
    {
      label: "Home",
      url: "/",
    },
    {
      label: "About",
      url: "/about.html",
    },
    {
      label: "CatJam GIF",
      url: "https://media.giphy.com/media/jpbnoe3UIa8TU8LM13/giphy.gif",
    },
  ];

  const answersEvent = new SimpleAnswersEvent({
    experienceKey: 'yext-inventory',
    experienceVersion: 'PRODUCTION',
    businessId: 2987593,
  });

  const sitesAnalytics = new SitesAnalytics();

  return (
    <>
      <div className="centered-container">
        <Header
          logo="https://cdn.fs.brandfolder.com/cache=expiry:604800/deY3VGFpSjC761Abjbfc"
          links={links}
        ></Header>
      </div>
      <Banner name={name} address={address} openTime={openTime}>
        <div className="bg-white h-40 w-1/5 flex items-center justify-center text-center flex-col space-y-4 rounded-lg">
          <div className="text-black text-base">Visit Us Today!</div>
          <Cta
            buttonText="Get Directions"
            url="http://google.com"
            style="primary-cta"
          />
        </div>
      </Banner>
      <div className="centered-container">
        <div className="section">
          <button onClick={() => answersEvent.fire()}>Answers analytics event</button>
          <br/>
          <button onClick={() => sitesAnalytics.click()}>Sites analytics event</button>
        </div>
        <div className="section">
          <div className="grid grid-cols-3 gap-x-10 gap-y-10">
            <div className="bg-gray-100 p-5 space-y-12">
              <Contact address={address} phone={mainPhone}></Contact>
              {services && <List list={services}></List>}
            </div>
            <div className="col-span-2 pt-5 space-y-10">
              <div>
                {hours && <Hours title={"Restaurant Hours"} hours={hours} />}
              </div>
              {geocodedCoordinate && (
                <StaticMap
                  latitude={geocodedCoordinate.latitude}
                  longitude={geocodedCoordinate.longitude}
                ></StaticMap>
              )}
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

/**
 * Defines how the plugin will render the template for the production build. This has no
 * impact on local dev.
 *
 * A convenient function is currently defined in src/wrapper.ts.
 *
 * NOTE: Future changes may impact how this is used.
 */
export const render = (data: Data) =>
  reactWrapper(data, "index.tsx", renderToString(<Index {...data} />), true);

export default Index;
