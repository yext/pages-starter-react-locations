import * as React from "react";

type Props = {
  name?: string;
  description?: string;
};

const About = ({ name, description } : Props) => {
  return (
    <>
        <div className="border-b border-gray-300 bg-gray-100 shadow-md rounded-lg p-2 px-4 py-5 sm:p-6">
            <div className="text-xl font-semibold">{`About ${name}`}</div>
            {description && <p className="pt-4">{description}</p>}
        </div>
    </>
  );
};

export default About;
