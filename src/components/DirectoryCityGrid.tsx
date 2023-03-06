import * as React from "react";
import { twMerge } from "tailwind-merge";
import { Address } from "@yext/pages/components";
import { formatPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input';


export const directoryCityGridFields = [
    "c_addressRegionDisplayName",
    "dm_directoryParents.name",
    "dm_directoryParents.slug",
    "dm_directoryParents.meta",
    "dm_directoryParents.c_addressRegionDisplayName",
    "dm_directoryChildren.name",
    "dm_directoryChildren.address",
    "dm_directoryChildren.mainPhone",
    "dm_directoryChildren.slug"
];

interface DirectoryGridProps {
    name?: string;
    description?: string;
    directoryParents?: any;
    directoryChildren?: any;
    relativePrefixToRoot?: string;
}


const DirectoryCityGrid = ({ name, description, directoryChildren, relativePrefixToRoot } : DirectoryGridProps) => {
    let sortedChildren;
    let childrenDivs;
    if (directoryChildren) {
        // Order children alphabetically by postal code
        sortedChildren = directoryChildren.sort(function(a:any, b:any) {
        a = a.address.postalCode;
        b = b.address.postalCode;
        return (a < b) ? -1 :(a > b) ? 1 : 0;
      });
        childrenDivs = directoryChildren.map((entity:any) => (
            <div className="border rounded-lg drop-shadow-md bg-gray-100 space-y-6 p-3 h-60">
                <h2>
                    <a className="font-bold text-2xl text-blue-700 hover:underline" href={relativePrefixToRoot + entity.slug}>{entity.name}</a>
                </h2>
                <div className="m-1 border"></div>
                <Address address={entity.address}></Address>
                <div className="space-x-3">
                    <span>&#128222;</span>
                    <span>{formatPhoneNumber(entity.mainPhone)}</span>
                </div>
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

export default DirectoryCityGrid;
