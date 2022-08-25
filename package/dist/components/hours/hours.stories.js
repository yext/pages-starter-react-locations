import React from "react";
import { Hours } from ".";
import {
  HOURS,
  HOURS_WITH_HOLIDAY,
  HOURS_WITH_REOPEN_DATE
} from "./sampleData";
var hours_stories_default = {
  title: "components/Hours",
  component: Hours
};
const Template = (args) => /* @__PURE__ */ React.createElement(Hours, {
  ...args
});
const NormalHours = Template.bind({});
NormalHours.args = {
  hours: HOURS,
  dayOfWeekNames: {
    sunday: "Sun",
    monday: "Mon",
    tuesday: "Tues",
    wednesday: "Wed",
    thursday: "Thur",
    friday: "Fri",
    saturday: "Sat"
  }
};
const NormalHours24 = Template.bind({});
NormalHours24.args = {
  hours: HOURS,
  timeOptions: {
    hour12: false
  }
};
const HolidayHours = Template.bind({});
HolidayHours.args = {
  hours: HOURS_WITH_HOLIDAY
};
const TemporarilyClosedHours = Template.bind({});
TemporarilyClosedHours.args = {
  hours: HOURS_WITH_REOPEN_DATE
};
export {
  HolidayHours,
  NormalHours,
  NormalHours24,
  TemporarilyClosedHours,
  hours_stories_default as default
};
