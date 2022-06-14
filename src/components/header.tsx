import * as React from "react";
import Cta from "../components/cta";

export type Link = {
  label: string;
  url: string;
};

type Header = {
  links: Link[];
  logo: string;
};

const Header = (props: Header) => {
  const { links, logo } = props;
  const linkDoms = links.map((link) => (
    <div key={link.label}>
      <a href={link.url} target="_blank" rel="noreferrer">
        {link.label}
      </a>
    </div>
  ));

  return (
    <>
      <div className="centered-container">
        <nav className="py-6 flex items-center justify-between">
          <img src={logo} width="50" height="50"></img>
          <div className="text-2xl font-semibold">
            Yext&apos;s Fashion Warehouse
          </div>
          <div className="flex gap-x-10 text-lg font-semibold">{linkDoms}</div>
          <div className="space-x-5">
            <Cta buttonText="Order Pickup" url="#" style="primary-cta"></Cta>
            <Cta
              buttonText="Order Delivery"
              url="#"
              style="secondary-cta"
            ></Cta>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
