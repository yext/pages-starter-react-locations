import * as React from "react";
import { twMerge } from "tailwind-merge";

type Cta = {
  buttonText: string;
  url: string;
  style?: string;
};

const Cta = (props: Cta) => {
  const { buttonText, url, style } = props;

  return (
    <a
      href={url}
      className={twMerge(
        "rounded-lg py-2 px-3 text-base font-bold text-white md:py-4 md:px-6",
        style
      )}
      target="_blank"
      rel="noopener noreferrer"
    >
      {buttonText}
    </a>
  );
};

export default Cta;
