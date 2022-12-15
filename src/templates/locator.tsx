import * as React from "react";
import "../index.css";
import { GetPath, Template, TemplateProps, TemplateRenderProps, TemplateConfig } from "@yext/pages";
import { 
  SearchHeadlessProvider,
  provideHeadless
} from "@yext/search-headless-react"; 
import { FilterSearch, VerticalResults, ResultsCount } from "@yext/search-ui-react";
import { Location } from "../types/search/locations";
import MapboxMap from "../components/MapboxMap";
import MapPin from "../components/MapPin";
import LocationCard from "../components/LocationCard";
import PageLayout from "../components/PageLayout";

export const config: TemplateConfig = {
  name: "locator",
};

export const getPath: GetPath<TemplateProps> = () => {
  return `locator`;
};

const searcher = provideHeadless({
  apiKey: (import.meta.env.YEXT_PUBLIC_SEARCH_API_KEY),
  experienceKey: "turtlehead-tacos-locator",
  verticalKey: "locations",
  locale: "en",
});

const Locator: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
    path,
    document,
    __meta
  }) => {
  const { _site } = document;
  
  return (
    <>
      <PageLayout _site={_site} templateData={{__meta, document}}>
        <SearchHeadlessProvider searcher={searcher}>
            <div className="w-full h-screen flex flex-col max-h-screen">
            <div className="flex flex-row w-full h-full overflow-y-auto">
                <div className="w-1/3 h-full bg-slate-50 border-r border-slate-300 shadow-md overflow-auto">
                <div className="sticky top-0 z-20 bg-slate-50 border-b border-slate-300">
                    <h3 className="m-2 font-semibold text-slate-900">
                      Find a Location
                    </h3>
                    <FilterSearch
                    customCssClasses={{
                        filterSearchContainer: "m-2",
                    }}
                    searchOnSelect={true}
                    searchFields={[
                        {
                        entityType: "location",
                        fieldApiName: "builtin.location",
                        },
                    ]}
                    />
                    <ResultsCount
                    customCssClasses={{ resultsCountContainer: "mx-2 my-0" }}
                    />
                </div>
                <VerticalResults<Location>
                    displayAllOnNoResults={false}
                    customCssClasses={{
                    verticalResultsContainer:
                        "flex flex-col divide-y divide-slate-300 overflow-auto",
                    }}
                    CardComponent={LocationCard}
                />
                </div>
                <div className="w-full h-full bg-blue-200">
                <MapboxMap<Location>
                    mapboxAccessToken={import.meta.env.YEXT_PUBLIC_MAPBOX_API_KEY}
                    getCoordinate={(location) =>
                    location.rawData.yextDisplayCoordinate}
                    PinComponent={MapPin}
                />
                </div>
            </div>
            </div>
        </SearchHeadlessProvider>
      </PageLayout>
    </>
  );
};

export default Locator;