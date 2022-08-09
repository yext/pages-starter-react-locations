import * as React from "react";
import Cta from "./cta";

  type Link = {
    label: string;
    url: string;
  };

  const links: Link[] = [
    {
      label: "Home",
      url: "/",
    },
    {
      label: "About",
      url: "/about",
    },
  ];

  const Header = () => {
    const linkDoms = links.map((link) => (
      <div key={link.label}>
        <a href={link.url} >
          {link.label}
        </a>
      </div>
    ));

  return (
    <>
      <div className="centered-container">
        <nav className="py-3 flex items-center justify-between">
          <img
              src="https://a.mktgcdn.com/p/8esDUBrhKJnkaVztLihLsC3quv_5BjLFG9L6MJ0adcs/150x150.png"
              width="120"
              height="120"
            ></img>
            <div className="flex gap-x-10 text-lg font-semibold">{linkDoms}</div>
          <div className="hidden space-x-5 sm:block">
            <Cta buttonText="Order Pickup" url="#" style="primary-cta"></Cta>
            <Cta buttonText="Order Delivery" url="#" style="secondary-cta"></Cta>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
