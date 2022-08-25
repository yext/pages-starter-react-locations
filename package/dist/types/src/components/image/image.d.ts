import * as React from "react";
import { ImageProps, ImageLayout } from "./types";
/**
 * Renders an image based from the Yext Knowledge Graph. Example of using the component to render
 * simple and complex image fields from Yext Knowledge Graph:
 * ```
 * import { Image } from "@yext/pages/components";
 *
 * const simpleImage = (<Image image={document.logo} />);
 * const complexImage = (<Image image={document.photoGallery[0]} />);
 * ```
 *
 * @public
 */
export declare const Image: ({ image, className, width, height, aspectRatio, layout, placeholder, imgOverrides, style, }: ImageProps) => JSX.Element;
export declare const validateRequiredProps: (layout: ImageLayout, imgWidth: number, imgHeight: number, width?: number, height?: number, aspectRatio?: number) => void;
/**
 * Returns the UUID of an image given its url. Logs an error if the image url is invalid.
 */
export declare const getImageUUID: (url: string) => string;
/**
 * Returns the image url given its uuid, width and height.
 */
export declare const getImageUrl: (uuid: string, width: number, height: number) => string;
/**
 * Returns the src, imgStyle and widths that will be set on the underlying img tag based on the
 * layout.
 */
export declare const handleLayout: (layout: ImageLayout, imgWidth: number, imgHeight: number, imgUUID: string, style: React.CSSProperties, absWidth?: number, absHeight?: number, aspectRatio?: number) => {
    src: string;
    imgStyle: React.CSSProperties;
    widths: number[];
};
export declare const getImageSizeForFixedLayout: (imgWidth: number, imgHeight: number, defaultWidths: number[], absWidth?: number, absHeight?: number) => {
    fixedWidth: number;
    fixedHeight: number;
    fixedWidths: number[];
};
