import * as React from "react";
import { CardComponent } from "@yext/search-ui-react";
import { Location } from "../types/search/locations";

const metersToMiles = (meters: number) => {
  const miles = meters * 0.000621371;
  return miles.toFixed(2);
}

const LocationCard: CardComponent<Location> = ({ result }) => {
  const { address } = result.rawData;
  var gmaps = "https://www.google.com/maps/dir/?api=1&destination=";
  var gmapsAddress = gmaps.concat(address.line1, ' ', address.city, ' ', address.region, ' ', address.postalCode);
  var gmapsLink = gmapsAddress.concat('"');

  return (
    <div className="p-4 bg-white space-y-3 hover:bg-gray-50">
      <a target="_blank" href={`${result.rawData.slug}`} className="space-y-3">
        <h1 className="text-slate-900 text-3xl text-blue-700">{result.rawData.name}</h1>
        <div>
          <p className="text-sm text-slate-700">{address.line1}</p>
          <p className="text-sm text-slate-700">{address.city}, {address.region}, {address.postalCode} </p>
          <p className="mt-1 text-xs italic text-slate-500">{metersToMiles(result.distanceFromFilter ?? 0)} mi</p>
        </div>
        <div>
          <a
            target="_blank"
            href={gmapsLink}
            className="text-sm text-blue-700 hover:underline">
            Get Directions
          </a>
        </div>
      </a>
    </div>
  );
}

export default LocationCard;