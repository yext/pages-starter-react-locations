import * as React from "react";
import { Address } from "@yext/pages/components";
import { formatPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input';
import List from "../components/List";

type Props = {
  address: any;
  phone?: string;
  services?: string[];
};

const Details = ({ address, phone, services} : Props) => {

  return (
    <>
      <div className="border-b border-gray-300 bg-gray-100 shadow-md rounded-lg p-2 px-4 py-5 sm:p-6">
        <div className="grid gap-y-3">
          <div className="text-xl font-semibold">Store Details</div>
          <Address address={address} lines={[['line1', 'line2'],[ 'city', ",", 'region']]} />
          {phone && <span><a href={`tel:${phone}`} className="hover:underline">{formatPhoneNumber(phone)}</a></span>}
          {services && <List list={services} />}
        </div>
      </div>

    </>
  );
};

export default Details;
