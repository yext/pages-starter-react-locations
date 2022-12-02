import { ComplexImageType, ImageType, Image } from "@yext/pages/components";
import * as React from "react";

type Banner = {
  coverPhoto?: ComplexImageType | ImageType;
  children?: React.ReactNode;
};

const Banner = ({ coverPhoto, children }: Banner) => {
  return (
    <>
      <div className="h-96 w-full relative">
        {coverPhoto && <Image className="w-full h-full" image={coverPhoto} />}
        <div className="absolute left-0 right-0 top-0 flex flex-col items-center ">
          <div className="w-96 my-8 rounded-xl bg-amber-500 border-8 shadow-xl border-amber-600 px-4 py-2 text-center">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
