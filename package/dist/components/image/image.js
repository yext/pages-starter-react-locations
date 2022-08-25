import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { ImageLayoutOption } from "./types";
const MKTGCDN_URL_REGEX = /(https?:\/\/a.mktgcdn.com\/p(-sandbox|-qa|-dev)?\/)(?<uuid>.+)\/(.*)/;
const Image = ({
  image,
  className,
  width,
  height,
  aspectRatio,
  layout = ImageLayoutOption.INTRINSIC,
  placeholder,
  imgOverrides,
  style = {}
}) => {
  const imgRef = useRef(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsImageLoaded(true);
    }
  }, []);
  validateRequiredProps(
    layout,
    image.image.width,
    image.image.height,
    width,
    height,
    aspectRatio
  );
  const imgWidth = Math.abs(image.image.width);
  const imgHeight = Math.abs(image.image.height);
  const imgUUID = getImageUUID(image.image.url);
  if (!imgUUID) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, placeholder != null && placeholder);
  }
  const absWidth = width && width > 0 ? width : void 0;
  const absHeight = height && height > 0 ? height : void 0;
  const { src, imgStyle, widths } = handleLayout(
    layout,
    imgWidth,
    imgHeight,
    imgUUID,
    style,
    absWidth,
    absHeight,
    aspectRatio
  );
  const srcSet = widths.map((w) => `${getImageUrl(imgUUID, w, imgHeight / imgWidth * w)} ${w}w`).join(", ");
  return /* @__PURE__ */ React.createElement(React.Fragment, null, !isImageLoaded && placeholder != null && placeholder, /* @__PURE__ */ React.createElement("img", {
    ref: imgRef,
    style: imgStyle,
    src,
    className,
    width: absWidth,
    height: absHeight,
    srcSet,
    loading: "lazy",
    ...imgOverrides
  }));
};
const validateRequiredProps = (layout, imgWidth, imgHeight, width, height, aspectRatio) => {
  if (imgWidth < 0) {
    console.warn(`Invalid image width: ${imgWidth}.`);
  }
  if (imgHeight < 0) {
    console.warn(`Invalid image height: ${imgHeight}.`);
  }
  if (layout == ImageLayoutOption.FIXED) {
    if (!width && !height) {
      console.warn(
        "Using fixed layout but width and height are not passed as props."
      );
      return;
    }
    if (width && width < 0) {
      console.warn(`Using fixed layout but width is invalid: ${width}.`);
    }
    if (height && height < 0) {
      console.warn(`Using fixed layout but height is invalid: ${height}.`);
    }
    return;
  }
  if (width || height) {
    console.warn(
      "Width or height is passed in but layout is not fixed. These will have no impact. If you want to have a fixed height or width then set layout to fixed."
    );
  }
  if (layout == ImageLayoutOption.ASPECT && !aspectRatio) {
    console.warn(
      "Using aspect layout but aspectRatio is not passed as a prop."
    );
  }
};
const getImageUUID = (url) => {
  const matches = url.match(MKTGCDN_URL_REGEX);
  if (!matches?.groups?.uuid) {
    console.error(`Invalid image url: ${url}.`);
    return "";
  }
  return matches.groups.uuid;
};
const getImageUrl = (uuid, width, height) => {
  return `https://dynl.mktgcdn.com/p/${uuid}/${Math.round(width)}x${Math.round(
    height
  )}`;
};
const handleLayout = (layout, imgWidth, imgHeight, imgUUID, style, absWidth, absHeight, aspectRatio) => {
  let widths = [100, 320, 640, 960, 1280, 1920];
  let src = getImageUrl(imgUUID, 500, 500);
  const imgStyle = { ...style };
  imgStyle.objectFit = imgStyle.objectFit || "cover";
  imgStyle.objectPosition = imgStyle.objectPosition || "center";
  switch (layout) {
    case ImageLayoutOption.INTRINSIC:
      imgStyle.maxWidth = imgWidth;
      imgStyle.width = "100%";
      imgStyle.aspectRatio = aspectRatio ? `${aspectRatio}` : `${imgWidth} / ${imgHeight}`;
      break;
    case ImageLayoutOption.FIXED: {
      const { fixedWidth, fixedHeight, fixedWidths } = getImageSizeForFixedLayout(
        imgWidth,
        imgHeight,
        widths,
        absWidth,
        absHeight
      );
      imgStyle.width = fixedWidth;
      imgStyle.height = fixedHeight;
      widths = fixedWidths;
      src = getImageUrl(imgUUID, fixedWidth, fixedHeight);
      break;
    }
    case ImageLayoutOption.ASPECT:
      imgStyle.aspectRatio = aspectRatio ? `${aspectRatio}` : `${imgWidth} / ${imgHeight}`;
      break;
    case ImageLayoutOption.FILL:
      imgStyle.width = "100%";
      imgStyle.aspectRatio = aspectRatio ? `${aspectRatio}` : `${imgWidth} / ${imgHeight}`;
      break;
    default:
      console.warn(`Unrecognized layout: ${layout}.`);
      break;
  }
  return { src, imgStyle, widths };
};
const getImageSizeForFixedLayout = (imgWidth, imgHeight, defaultWidths, absWidth, absHeight) => {
  if (absWidth && absHeight) {
    return {
      fixedWidth: absWidth,
      fixedHeight: absHeight,
      fixedWidths: [absWidth]
    };
  }
  if (absWidth) {
    return {
      fixedWidth: absWidth,
      fixedHeight: absWidth * imgHeight / imgWidth,
      fixedWidths: [absWidth]
    };
  }
  if (absHeight) {
    return {
      fixedWidth: absHeight / imgHeight * imgWidth,
      fixedHeight: absHeight,
      fixedWidths: [absHeight / imgHeight * imgWidth]
    };
  }
  return {
    fixedWidth: imgWidth,
    fixedHeight: imgHeight,
    fixedWidths: defaultWidths
  };
};
export {
  Image,
  getImageSizeForFixedLayout,
  getImageUUID,
  getImageUrl,
  handleLayout,
  validateRequiredProps
};
