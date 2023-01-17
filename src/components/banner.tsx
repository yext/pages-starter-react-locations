import * as React from "react";
import Cta from "./cta";

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
      <div
        className={`relative z-10 h-96 w-full bg-[url(/src/assets/images/tacos-1.avif)] bg-cover bg-center `}
      >
        <div className="absolute left-0 right-0 flex flex-col items-center ">
          <div className="my-8 w-96 rounded-xl border-8 border-amber-600 bg-amber-500 px-4 py-2 text-center shadow-xl">
            <div>
              <h1 className="text-3xl font-semibold text-white">{name}</h1>
              <p className="pt-2 text-lg font-semibold text-white">
                {renderPrettyAddress(address)}
              </p>
            </div>
            <div className="flex justify-between pt-4">
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
