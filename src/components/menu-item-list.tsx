import { Image, ComplexImageType, ImageType } from "@yext/pages/components";
import * as React from "react";

interface MenuItemListProps {
  title?: string;
  menuItems?: {
    name: string;
    photoGallery: ComplexImageType[] | ImageType[];
  }[];
}

const MenuItemList = ({ title, menuItems }: MenuItemListProps): JSX.Element => {
  if (!menuItems) {
    return <></>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 lg:max-w-7xl ">
        <h2 className="text-2xl font-bold tracking-tight text-orange">
          {title}
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-auto xl:gap-x-8">
          {menuItems.map((item) => (
            <div key={item.name} className="group relative">
              {item.photoGallery[0] && (
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <Image
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    image={item.photoGallery[0]}
                  />
                </div>
              )}
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className=" text-orange font-semibold">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {item.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuItemList;
