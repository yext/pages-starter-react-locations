import * as React from "react";
import { localeAddressFormat } from "./i18n";
import { getUnabbreviated } from "./methods";
const Address = ({ address, lines, separator }) => {
  const renderedLines = (lines || localeAddressFormat(address.countryCode)).map(
    (line) => /* @__PURE__ */ React.createElement(AddressLine, {
      address,
      line,
      separator,
      key: line.toString()
    })
  );
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderedLines);
};
Address.defaultProps = {
  separator: ","
};
const AddressLine = ({
  address,
  line,
  separator
}) => {
  let addressDOM = [];
  for (const field of line) {
    if (field === ",") {
      addressDOM.push(/* @__PURE__ */ React.createElement("span", {
        key: field
      }, separator));
      continue;
    }
    const value = address[field];
    if (!value) {
      continue;
    }
    const unabbreviated = getUnabbreviated(field, address);
    if (unabbreviated) {
      addressDOM.push(
        /* @__PURE__ */ React.createElement("abbr", {
          key: field,
          title: unabbreviated
        }, " ", value)
      );
      continue;
    }
    addressDOM.push(/* @__PURE__ */ React.createElement("span", {
      key: field
    }, " ", value));
  }
  return /* @__PURE__ */ React.createElement("div", null, addressDOM);
};
export {
  Address
};
