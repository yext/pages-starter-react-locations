import * as React from "react";
import Cta from "./cta";
import taco from "../assets/images/taco.jpeg";

export type Address = {
  line1: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
};

type Banner = {
  name?: string;
  address?: Address;
};

const renderPrettyAddress = (address?: Address) => {
  return (
    <>
      {address && (
        <span>
          {address.line1} in {address.city}, {address.region}
        </span>
      )}
    </>
  );
};

const Banner = (props: Banner) => {
  const { name, address } = props;

  return (
    <>
    <img src={taco} alt="taco" />
      <div
        className={`relative z-10 w-full bg-cover bg-center h-96 bg-[url(assets/images/tacos-1.avif)] `}
      >
        <div className="absolute left-0 right-0 flex flex-col items-center ">
          <div className="w-96 my-8 rounded-xl bg-amber-500 border-8 shadow-xl border-amber-600 px-4 py-2 text-center">
            <div>
              <h1 className="text-white text-3xl font-semibold">{name}</h1>
              <p className="text-lg pt-2 text-white font-semibold">
                {renderPrettyAddress(address)}
              </p>
            </div>
            <div className="flex pt-4 justify-between">
              <Cta
                buttonText="Order Pickup"
                url="#"
                style="text-orange bg-white shadow-xl"
              ></Cta>
              <Cta
                buttonText="Order Delivery"
                url="#"
                style="text-orange bg-white shadow-xl"
              ></Cta>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
