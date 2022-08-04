import * as React from "react";

type Banner = {
  text?: string;
  children?: React.ReactNode;
};

const Banner = (props: Banner) => {
  const { 
    text, 
    children 
  } = props;

  return (
    <>
      <div className="bg-red-900 text-5xl font-bold text-white p-10 flex items-center justify-center flex-col gap-x-14 gap-y-10 md:flex-row">
        <div>{text}</div>
        {children}
      </div>
    </>
  );
};

export default Banner;
