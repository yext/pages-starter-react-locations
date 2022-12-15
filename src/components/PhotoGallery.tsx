import * as React from "react";
import { Image } from "@yext/pages/components";

const PhotoGallery = (props: any) => {
  const { photoGallery, height, width } = props;
  const photos = photoGallery.map((element:any, index:number) => (
    <div key={index}>
      <Image 
        className="image"
        image={element.image}
        layout="fill"
      />
    </div>
  ));


  return (
    <>
      <div className="section space-y-5">
        <div className="text-xl font-semibold ">Photo Gallery</div>
        <div className="grid space-x-5 md:grid-cols-2 lg:grid-cols-3">
            {photos}
        </div>
      </div>
    </>
  );
};

export default PhotoGallery;