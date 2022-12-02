/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */
import * as React from "react";
import "../index.css";
import {
  Template,
  GetPath,
  GetHeadConfig,
  HeadConfig,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import PageLayout from "../components/page-layout";
import Favicon from "../public/yext-favicon.ico";
import Banner from "../components/banner";
import SearchExperience from "../components/search/search-experience";
import { FilterSearch, OnSelectParams, SearchBar } from "@yext/search-ui-react";
import { provideHeadless, SandboxEndpoints } from "@yext/search-headless-react";
import EntityPreviews from "../components/search/EntityPreviews";

/**
 * Not required depending on your use case.
 */
export const config: TemplateConfig = {
  // The name of the feature. If not set the name of this file will be used (without extension).
  // Use this when you need to override the feature name.
  name: "turtlehead-tacos",
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = () => {
  return `index.html`;
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
    title: "Static Page Example",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: "Static page example meta description.",
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

const entityPreviewSearcher = provideHeadless({
  apiKey: "797c677bfccd5cea5e3a63f9ec67928a",
  experienceKey: "turtlehead",
  locale: "en",
  endpoints: SandboxEndpoints,
  headlessId: "entity-preview-searcher",
});

const reviewsPath =
  "https://streams-sbx.yext.com/v2/accounts/me/api/locationByNeighborhood";

export const fetchSlugForLocationByNeighborhood = async (
  neighborhood: string
) => {
  const requestString = `${reviewsPath}?api_key=0ba9ba83014a28b9c446292127846451&v=20221114&neighborhood=${neighborhood}`;

  try {
    const resp = await fetch(requestString);
    const locationsResponse = await resp.json();
    if (locationsResponse?.response?.docs.length > 0) {
      const locationSlug = locationsResponse.response.docs[0].slug;

      // change the path to the location page with window.location
      window.location.href = `/${locationSlug}`;
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct result from `getStaticProps`.
 */
const Static: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}: TemplateRenderProps) => {
  const _site = document._site;

  const handleFilterSelect = (params: OnSelectParams) => {
    fetchSlugForLocationByNeighborhood(params.newDisplayName).then(
      (response) => {
        console.log(response);
      }
    );
  };

  return (
    <SearchExperience>
      <PageLayout>
        <Banner coverPhoto={_site.c_coverPhoto}>
          <h1 className="text-white text-3xl font-semibold">
            Turtlehead Tacos
          </h1>
          {/* <SearchBar
            customCssClasses={{ searchBarContainer: "mt-6" }}
            hideRecentSearches
            visualAutocompleteConfig={{
              entityPreviewSearcher,
              renderEntityPreviews: EntityPreviews,
              includedVerticals: ["locations"],
              entityPreviewsDebouncingTime: 0,
            }}
          /> */}
          <FilterSearch
            customCssClasses={{
              highlighted: "text-orange font-semibold",
              nonHighlighted: "text-black",
              option: "text-left",
            }}
            searchFields={[
              {
                entityType: "location",
                fieldApiName: "neighborhood",
              },
            ]}
            onSelect={handleFilterSelect}
          />
        </Banner>
        <div className="centered-container">
          <div className="text-5xl font-bold text-orange p-10 flex items-center justify-center flex-col gap-x-14 gap-y-10 md:flex-row">
            <h1>Our Story</h1>
          </div>
          <div className="space-y-5">
            <p className="text-lg">
              At Turtlehead Tacos, our mission is to deliver authentic,
              flavorful and fresh TexMex cuisine. We use only the highest
              quality ingredients and spices to give our dishes a unique and
              tasty edge. Our menu features traditional Mexican favorites such
              as tacos, burritos, enchiladas, and fajitas, as well as signature
              dishes like our signature quesadillas. All of our items are
              handmade from scratch and cooked to perfection. We also offer a
              variety of sides, desserts and drinks to complete your meal. Come
              and enjoy a delicious and satisfying meal with us at Turtlehead
              Tacos!
            </p>
          </div>
        </div>
      </PageLayout>
    </SearchExperience>
  );
};

export default Static;
