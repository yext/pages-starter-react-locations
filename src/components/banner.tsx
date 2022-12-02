import * as React from "react";

type Banner = {
  photoUrl?: string;
  children?: React.ReactNode;
};

const Banner = (props: Banner) => {
  const { photoUrl, children } = props;

  const backgroundImageUrl = photoUrl
    ? photoUrl
    : "src/assets/images/tacos-1.avif";

  return (
    <>
      <div
        className={`relative z-10 w-full bg-cover bg-center h-96 bg-[url(${backgroundImageUrl})] `}
      >
        <div className="absolute left-0 right-0 flex flex-col items-center ">
          <div className="w-96 my-8 rounded-xl bg-amber-500 border-8 shadow-xl border-amber-600 px-4 py-2 text-center">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
