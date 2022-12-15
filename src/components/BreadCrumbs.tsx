import * as React from "react";
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'

type Entity = {
  name?: string;
  meta?: any;
  slug?: string;
};

type BreadCrumbs = {
  name?: string;
  parents?: Array<Entity>;
  baseUrl?: string;
};

const BreadCrumbs = (props:BreadCrumbs) => {
  const { 
    name,
    parents,
    baseUrl 
  } = props;

  return (
    <nav className="section flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        {parents && parents.map((crumb:any, index:number) => (
          index === 0 ? (
            <li key={`${crumb.name}-${crumb.meta.entityType.id}`}>
            <div className="flex items-center">
              <a href={baseUrl + crumb.slug} className="text-gray-400 hover:text-gray-500">
                <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span className="sr-only">Home</span>
              </a>
            </div>
          </li>
          ) : 
          <li key={`${crumb.name}-${crumb.meta.entityType.id}`}>
            <div className="flex items-center">
              <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <a
                href={baseUrl + crumb.slug}
                className="ml-4 font-medium text-gray-500 hover:text-gray-700"
                // aria-current={page.current ? 'page' : undefined}
              >
                {crumb.name}
              </a>
            </div>
          </li>
        ))}
        {parents ? (
          <li key={name}>
            <div className="flex items-center">
              <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <div className="ml-4">{name}</div>
            </div>
          </li>
        ) :
          <li key={name}>
            <div className="flex items-center text-gray-400">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </div>
          </li>
        }
      </ol>
    </nav>


  );
};

export default BreadCrumbs;
