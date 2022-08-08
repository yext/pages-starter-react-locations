import * as React from "react";

const Address = (props: any) => {
    const { address } = props;
    var gmaps = "https://www.google.com/maps/dir/?api=1&destination=";
    var gmapsAddress = gmaps.concat(address.line1, ' ', address.city, ' ', address.region, ' ', address.postalCode);
    var gmapsLink = gmapsAddress.concat('"');

  return (
    <>
      <div>
        <a href={gmapsLink} target="_blank" className="hover:underline">
            <div>{address.line1}</div>
            {address.line2 && (<div>{address.line2}</div>)}
            <div>{address.city}, {address.region} {address.postalCode}</div>
            {/* <div>{address.countryCode}</div> */}
        </a>
      </div>
    </>
  );
};

export default Address;
