import React from "react";
import { CSSProperties } from "react";
import { XMarkIcon } from '@heroicons/react/20/solid'

type HelperToolProps = {
  data: Record<string, any>;
  locale?: string;
};

export const HelperTool = ({ data, locale }: HelperToolProps) => {
 if (!data){
         return  <div></div>
 }
  const [isOpen, setIsOpen] = React.useState(true);
  const { id, uid } = data;
  const styling: CSSProperties = {
    position: "fixed",
    width: "150px",
    background: "white",
    right: 0,
    bottom: 0,
    zIndex: 100,
    padding: 10,
    border: "1px solid gray",
    display: isOpen ? "block" : "none",
  };

  const editUrl = `https://www.yext.com/s/${data.businessId}/entity/edit3?entityIds=${uid}`;

  const onCloseClick = () => {
    setIsOpen(false);
  };
  
  return (
    <div className="yext-helper-tool" style={styling}>
     <span className="isolate inline-flex rounded-lg shadow-sm">
      <a
      target="_blank"
        type="button"
        href={editUrl}
        className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        Edit
      </a>
     <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={onCloseClick}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
    </span>
    </div>
  );
};
