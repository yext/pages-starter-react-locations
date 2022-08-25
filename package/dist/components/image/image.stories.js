import React from "react";
import { Image } from "./image";
const imgWidth = 20;
const imgHeight = 10;
const imgUUID = "uuid";
const width = 200;
const height = 100;
const widths = [100, 200, 300];
const aspectRatio = 1;
const image = {
  image: {
    height: 375,
    thumbnails: [
      {
        height: 375,
        url: "https://a.mktgcdn.com/p/kl4giA5KlVKbqfRIv9OsgtYEUIXR1SHTZISGNT_TrKw/300x375.jpg",
        width: 300
      }
    ],
    url: "https://a.mktgcdn.com/p/kl4giA5KlVKbqfRIv9OsgtYEUIXR1SHTZISGNT_TrKw/300x375.jpg",
    width: 300
  }
};
var image_stories_default = {
  title: "components/Image",
  component: Image
};
const Template = (args) => /* @__PURE__ */ React.createElement(Image, {
  ...args
});
const Platform_Image = Template.bind({});
Platform_Image.args = {
  image
};
export {
  Platform_Image,
  image_stories_default as default
};
