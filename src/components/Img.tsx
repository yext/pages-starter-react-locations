import * as React from "react";
import { useRef, useState } from "react";

type Thumbnail = {
  height: number;
  width: number;
  url: string;
};

export type Image = {
  height: number;
  width: number;
  url: string;
  thumbnails?: Thumbnail[];
};

const imageUrlAtLeast = (uuid: string, width: number, height: number) => {
  return `https://dynl.mktgcdn.com/p/${uuid}/${Math.round(width)}x${Math.round(
    height
  )}`;
};

type Props = {
  //Insert Props Here
  layout?: "fixed" | "constrained" | "full-width";
  className?: string;
  image: Image;
  width?: number;
  height?: number;
  aspectRatio?: number;
  objectFit?: React.CSSProperties["objectFit"];
  objectPosition?: React.CSSProperties["objectPosition"];
  placeholder?: React.ReactNode;
};

const Img = ({
  className,
  image,
  width,
  height,
  aspectRatio,
  objectFit = "cover",
  objectPosition = "center",
  layout = "constrained",
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const imgWidth = image.width;
  const imgHeight = image.height;
  const [imgURL, setImgURL] = useState<string>();

  const style: React.CSSProperties = {
    objectFit,
    objectPosition,
  };

  if (layout == "fixed") {
    if (!width && !height) {
      console.warn(
        "Using fixed layout but width and height are not passed as props"
      );
    }
  } else {
    if (width || height) {
      console.warn(
        "Width or height is passed in but layout is not fixed. These will have no impact. If you want to have a fixed height or width then set layout to fixed."
      );
    }
  }

  // Only populated if fixed
  const fixedWidth = width
    ? width
    : height
    ? (height / imgHeight) * imgWidth
    : null;
  const fixedHeight = height
    ? height
    : width
    ? (width * imgHeight) / imgWidth
    : null;

  if (layout == "constrained") {
    // Don't let image be wider then it's intrinsic width
    style.maxWidth = imgWidth;
    style.width = "100%";

    if (aspectRatio) {
      style.aspectRatio = `${aspectRatio}`;
    } else {
      style.aspectRatio = `${imgWidth} / ${imgHeight}`;
    }
  } else if (layout == "full-width") {
    style.width = "100%";
    if (aspectRatio) {
      style.aspectRatio = `${aspectRatio}`;
    } else {
      style.aspectRatio = `${imgWidth} / ${imgHeight}`;
    }
  } else if (layout == "fixed") {
    style.width = fixedWidth ?? undefined;
    style.height = fixedHeight ?? undefined;
  }

  let photoUUID = image.url.split("/")[4];

  const widths: number[] =
    layout == "fixed" && width
      ? [width]
      : layout == "fixed" && height
      ? [(height / imgHeight) * imgWidth]
      : [100, 320, 640, 960, 1280, 1920];

  // Generate Image Sourceset
  const srcSet = widths
    .map((width) => {
      return `${imageUrlAtLeast(
        photoUUID,
        width,
        (imgHeight / imgWidth) * width
      )} ${width}w`;
    })
    .join(", ");

  const src =
    layout == "fixed" && fixedWidth && fixedHeight
      ? imageUrlAtLeast(photoUUID, fixedWidth, fixedHeight)
      : imageUrlAtLeast(photoUUID, 500, 500);

  return (
    <div ref={ref} className="bg-gray-200 relative" style={style}>
      <div className="absolute"></div>
      <img
        style={style}
        src={src}
        className={className}
        width={width}
        height={height}
        srcSet={srcSet}
      />
      {/* <pre className="absolute inset-0 bg-black/40 text-white flex justify-center items-center font-mono text-xs">
        {photoUUID}
      </pre> */}
    </div>
  );
};

export default Img;
