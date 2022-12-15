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
      <div className="relative bg-indigo-500">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://media.glassdoor.com/companyupdate/w900/312260/yext-companyupdate-1670879854232.png?signature=5aee70f0e887bd74b12bcc37c150a8c910dfd5b837711510c9055590fae26eab"
            alt=""
          />
          <div className="absolute inset-0 bg-indigo-500 mix-blend-multiply" aria-hidden="true" />
        </div>
        <div className="section relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">{text}</h1>
          <p className="mt-6 max-w-3xl text-xl text-indigo-100">
            Mattis amet hendrerit dolor, quisque lorem pharetra. Pellentesque lacus nisi urna, arcu sociis eu. Orci vel
            lectus nisl eget eget ut consectetur. Sit justo viverra non adipisicing elit distinctio.
          </p>
        </div>
      </div>
    </>
  );
};

export default Banner;
