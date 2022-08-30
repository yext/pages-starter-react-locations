import * as React from "react";
import { CardComponent } from "@yext/search-ui-react";
import { Location } from "../types/search/locations";

const metersToMiles = (meters: number) => {
  const miles = meters * 0.000621371;
  return miles.toFixed(2);
}

const LocationCard: CardComponent<Location> = ({ result }) => {
  const { address } = result.rawData;
  return (
    <div className="p-4 bg-white">
      <h1 className="text-slate-900">{result.rawData.name}</h1>
      <p className="text-sm text-slate-700">{address.line1}</p>
      <p className="text-sm text-slate-700">{address.city}, {address.region}, {address.postalCode} </p>
      <p className="mt-1 text-xs italic text-slate-500">{metersToMiles(result.distanceFromFilter ?? 0)} mi</p>
      <a
        target="_blank"
        href={`${result.rawData.slug}`}
        className="text-xs text-blue-700 hover:underline">
        View Location Website
      </a>
    </div >
  );
}

export default LocationCard;