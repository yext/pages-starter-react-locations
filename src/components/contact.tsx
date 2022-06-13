import * as React from "react";
import Cta from "../components/cta";

type Address = {
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
};

const renderPrettyAddress = (address: Address) => {
  return (
    <>
      <div>{address.line1}</div>
      <div>
        {address.city}, {address.region}
      </div>
    </>
  );
};

const Contact = (props: any) => {
  const { address, phone } = props;

  return (
    <>
      <div className="grid gap-y-5">
        <div className="text-xl font-semibold">Contact</div>
        <div className="grid gap-y-3">
          <div className="">{renderPrettyAddress(address)}</div>
          <div>
            <a href="#">{phone}</a>
          </div>
        </div>
        <div className="w-30">
          <Cta buttonText="Order Online" url="#" style="primary-cta"></Cta>
        </div>
      </div>
    </>
  );
};

export default Contact;
