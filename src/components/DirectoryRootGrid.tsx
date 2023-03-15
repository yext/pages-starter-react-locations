import * as React from "react";
import { twMerge } from "tailwind-merge";
import { formatPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input';


export const directoryRootGridFields = [
    "dm_directoryChildren.name",
    "dm_directoryChildren.slug",
    "dm_directoryChildren.c_addressRegionDisplayName",
    "dm_directoryChildren.dm_directoryChildrenCount"
];


interface DirectoryRootProps {
    name?: string;
    description?: string;
    directoryChildren?: any;
    relativePrefixToRoot?: string;
}

const DirectoryRootGrid = ({ name, description, directoryChildren, relativePrefixToRoot } : DirectoryRootProps) => {
    let sortedChildren = directoryChildren.sort(function(a:any, b:any) {
        a = a.name
        b = b.name;
        return (a < b) ? -1 :(a > b) ? 1 : 0;
      });
      const childrenDivs = directoryChildren.map((entity:any) => (
        <div>
          <a key="uRL" href={relativePrefixToRoot + entity.slug} className="font-bold text-2xl text-blue-700 hover:underline">
            {(entity.c_addressRegionDisplayName ? entity.c_addressRegionDisplayName : entity.name)} ({entity.dm_directoryChildrenCount})
          </a>
        </div>
      ));
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

export default DirectoryRootGrid;
