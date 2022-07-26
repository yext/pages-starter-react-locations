import * as React from "react";
import Site from "../types/Site";

type FooterProps = {
  _site: Site
}

const Footer = ({_site}: FooterProps) => {

  return (
    <footer className="">
      <div className="flex flex-col flex-wrap justify-center p-5 md:flex-row">
        <span className="inline-flex justify-center w-full mx-auto mt-2 mr-2 sm:ml-auto sm:mt-0 space-x-3">
          <a className="text-black hover:text-blue-500" href={_site.instagramHandle}>
            <svg
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
            </svg>
          </a>
          <a className="text-black hover:text-blue-500" href={_site.twitterHandle}>
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
            </svg>
          </a>
        </span>
      </div>
      <div className="w-full px-8 mt-4 rounded-b-lg bg-blueGray-50">
      </div>
    </footer>
  );
};

export default Footer;
