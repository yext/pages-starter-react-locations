import * as React from "react";

export interface StaticMapProps {
  latitude: string;
  longitude: string;
}

const mapsApiKey = YEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const StaticMap = (props: StaticMapProps) => {
  const { latitude, longitude } = props;
  if (!mapsApiKey) {
    return (
      <>
        <div className="w-full">
          It looks like you need a Maps API key. Grab an API Key from Google
          Maps and add it to your .env file
        </div>
      </>
    );
  }

  return (
    <>
      <img
        className="w-full"
        width="300"
        height="200"
        src={
          "https://maps.googleapis.com/maps/api/staticmap?center=" +
          `${latitude}` +
          "," +
          `${longitude}` +
          "&zoom=14&size=600x400&maptype=roadmap&markers=color:red%7Clabel:LL%7C" +
          `${latitude}` +
          "," +
          `${longitude}` +
          `&key=${mapsApiKey}`
        }
      ></img>
    </>
  );
};

export default StaticMap;
