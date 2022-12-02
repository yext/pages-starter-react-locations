import * as React from "react";
import {
  FocusedItemData,
  DropdownItem,
  renderHighlightedValue,
} from "@yext/search-ui-react";
import {
  VerticalResults as VerticalResultsData,
  Result,
  HighlightedValue,
} from "@yext/search-headless-react";
import { v4 as uuid } from "uuid";
import Location from "../../types/locations";

const EntityPreviews = (
  autocompleteLoading: boolean,
  verticalKeyToResults: Record<string, VerticalResultsData>,
  dropdownItemProps: {
    onClick: (
      value: string,
      _index: number,
      itemData?: FocusedItemData
    ) => void;
    ariaLabel: (value: string) => string;
  }
) => {
  const locations = verticalKeyToResults["locations"]?.results.map(
    (result) => result
  ) as unknown as Result<Location>[];
  if (!locations) {
    return null;
  }
  return (
    <div className="max-h-max overflow-y-scroll sm:max-h-96 sm:shadow-2xl ">
      {locations.map((result) => {
        const title: string | Partial<HighlightedValue> =
          (result.highlightedFields?.neighborhood as unknown as string) ??
          (result.rawData.neighborhood as Partial<HighlightedValue>);

        return (
          <DropdownItem key={uuid()} value={uuid()}>
            <a href={result.rawData.slug}>
              <div className="py-3 px-4 hover:bg-gray-200 flex items-start flex-col">
                <div>
                  {renderHighlightedValue(title, {
                    nonHighlighted: "text-black text-base",
                    highlighted: "text-orange text-base font-semibold",
                  })}
                </div>
                {result.rawData.address && (
                  <div className="text-gray-500 text-sm">
                    {result.rawData.address.line1}
                  </div>
                )}
              </div>
            </a>
            <div className="mx-2.5 h-px bg-gray-200" />
          </DropdownItem>
        );
      })}
    </div>
  );
};

export default EntityPreviews;
