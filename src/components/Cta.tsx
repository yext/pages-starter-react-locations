import * as React from "react";
import { twMerge } from "tailwind-merge";

export interface CtaProps {
  buttonText: string;
  url?: string;
  style?: string;
}

const Cta = ({ buttonText, url, style }: CtaProps) => {
  return (
    <>
      <a
        href={url}
        className={twMerge(
          "py-4 px-6 text-base font-bold rounded-lg hover:scale-[1.02] duration-250",
          style
        )}
        target=""
        rel="noopener noreferrer"
      >
        {buttonText}
      </a>
    </>
  );
};

export default Cta;
