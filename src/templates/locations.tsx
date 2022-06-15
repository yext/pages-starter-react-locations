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
  Data,
  Default,
  GetHeadConfig,
  GetPath,
  HeadConfig,
  TemplateConfig,
} from "@yext/yext-sites-scripts";
import * as React from "react";
import Interactive from "../components/interactive";
import Layout from "../components/layout";
import StaticMap from "../components/static-map";

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
export const getPath: GetPath<Data> = (data) => {
  return `index/${data.document.streamOutput.id.toString()}`;
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<Data> = ({
  document,
}): HeadConfig => {
  return {
    title: document.streamOutput.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          description: document.streamOutput.description,
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
const Index: Default<Data> = (data) => {
  const { document } = data;
  const { streamOutput } = document;
  const {
    name,
    address,
    openTime,
    hours,
    mainPhone,
    geocodedCoordinate,
    services,
  } = streamOutput;

  return (
    <Layout>
      <div className="prose">
        <h1>Template with Stream</h1>
        <p>
          This is an example of a template powered by a stream. A page will get
          generated for every location in the Knowledge Graph you have linked to
          this repository.
        </p>
        <h3>Page Data</h3>
        <p>Here is an example of some of the data being passed to this page</p>
        <pre>
          {JSON.stringify(
            { address, mainPhone, name, geocodedCoordinate },
            null,
            2
          )}
        </pre>
        <p>
          You can use this data throughout your template. For example here is
          how the show the address with a map:
        </p>

        <h3>Address and Map</h3>
        <div className="grid md:grid-cols-2 gap-4 not-prose border bg-gray-100 p-4">
          <div>
            <StaticMap {...geocodedCoordinate} />
          </div>
          <div>
            <div>{address.line1}</div>
            <div>{address.line2}</div>
            <div>
              {address.city}, {address.region} {address.postalCode}
            </div>
          </div>
        </div>
        <Interactive />
      </div>
    </Layout>
  );
};

export default Index;
