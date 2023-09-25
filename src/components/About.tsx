export interface AboutProps {
  name?: string;
  description?: string;
}

const About = ({ name, description }: AboutProps) => {
  const about = name === null ? "About" : `About ${name}`;
  return (
    <>
      <div className="border-b border-gray-300 bg-gray-100 shadow-md rounded-lg p-2 px-4 py-5 sm:p-6">
        <div className="text-xl font-semibold">{about}</div>
        {description && <p className="pt-4">{description}</p>}
      </div>
    </>
  );
};

export default About;
