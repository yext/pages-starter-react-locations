import * as React from "react";
import { twMerge } from "tailwind-merge";
import { Address } from "@yext/pages/components";
import { formatPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input';


export const directoryStateGridFields = [
    "c_addressRegionDisplayName",
    "dm_directoryParents.name",
    "dm_directoryParents.slug",
    "dm_directoryParents.meta",
    "dm_directoryChildren.name",
    "dm_directoryChildren.slug",
    "dm_directoryChildren.dm_directoryChildrenCount"
];


interface DirectoryGridProps {
    name?: string;
    description?: string;
    directoryParents?: any;
    directoryChildren?: any;
    relativePrefixToRoot?: string;
}


const DirectoryStateGrid = ({ name, description, directoryChildren, relativePrefixToRoot } : DirectoryGridProps) => {
    let sortedChildren;
    let childrenDivs;
    if (directoryChildren) {
          sortedChildren = directoryChildren.sort(function(a:any, b:any) {
          a = a.name;
          b = b.name;
          return (a < b) ? -1 :(a > b) ? 1 : 0;
      });
          childrenDivs = directoryChildren.map((entity:any) => (
            <div>
              <a key="uRL" href={relativePrefixToRoot + entity.slug} className="font-bold text-2xl text-blue-700 hover:underline">
                {entity.name} ({entity.dm_directoryChildrenCount})
              </a>
            </div>
      ));
    }
  return (
    <>
        <div className="section space-y-14 px-10">
            <div className="space-y-6">
                {name && <h1 className="text-3xl font-semibold text-center">{name}</h1>}
                {description && <p className="text-2xl text-center">{description}</p>}
            </div>
            {directoryChildren && (
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {childrenDivs}
                </div>
            )}
        </div>
    </>
  );
};

export default DirectoryStateGrid;
