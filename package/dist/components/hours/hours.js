import React, { useEffect, useState } from "react";
import c from "classnames";
import {
  HoursManipulator,
  arrayShift,
  intervalsListsAreEqual
} from "./hoursManipulator";
import "./hoursTable.css";
const defaultDayOfWeekNames = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];
const defaultDayOfWeekSortIdx = [0, 1, 2, 3, 4, 5, 6];
function getSortIdx(props, todayDate) {
  let startIdx = 0;
  if (props.startOfWeek === "today") {
    startIdx = todayDate.getDay();
    return arrayShift(defaultDayOfWeekSortIdx, startIdx);
  } else if (props.startOfWeek) {
    startIdx = defaultDayOfWeekNames.indexOf(props.startOfWeek);
    return arrayShift(defaultDayOfWeekSortIdx, startIdx);
  } else {
    return defaultDayOfWeekSortIdx;
  }
}
function collapseDays(hoursDays) {
  let collapsedDays = [];
  hoursDays.forEach((hoursDay) => {
    const latestGroup = collapsedDays[collapsedDays.length - 1];
    if (!latestGroup) {
      collapsedDays.push({
        startDay: hoursDay.dayOfWeek,
        endDay: hoursDay.dayOfWeek,
        ...hoursDay
      });
    } else {
      if (intervalsListsAreEqual(latestGroup.intervals, hoursDay.intervals)) {
        latestGroup.endDay = hoursDay.dayOfWeek;
        latestGroup.isToday = latestGroup.isToday || hoursDay.isToday;
      } else {
        collapsedDays.push({
          startDay: hoursDay.dayOfWeek,
          endDay: hoursDay.dayOfWeek,
          ...hoursDay
        });
      }
    }
  });
  return collapsedDays.map((day) => ({
    ...day,
    dayOfWeek: day.startDay === day.endDay ? `${day.startDay}` : `${day.startDay} - ${day.endDay}`
  }));
}
function defaultIntervalStringsBuilder(dayData, timeOptions) {
  let intervalStrings = [];
  if (dayData.intervals.length === 0) {
    intervalStrings.push("Closed");
  } else {
    dayData.intervals.forEach((interval) => {
      let startTime = interval.getStartTime("en-US", timeOptions);
      let endTime = interval.getEndTime("en-US", timeOptions);
      intervalStrings.push(`${startTime} - ${endTime}`);
    });
  }
  return intervalStrings;
}
function dayOfWeekNamesToArray(nameMap) {
  return [
    nameMap.sunday || defaultDayOfWeekNames[0],
    nameMap.monday || defaultDayOfWeekNames[1],
    nameMap.tuesday || defaultDayOfWeekNames[2],
    nameMap.wednesday || defaultDayOfWeekNames[3],
    nameMap.thursday || defaultDayOfWeekNames[4],
    nameMap.friday || defaultDayOfWeekNames[5],
    nameMap.saturday || defaultDayOfWeekNames[6]
  ];
}
const Hours = (props) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const h = new HoursManipulator(props.hours);
  const now = new Date();
  const dayOfWeekNames = props.dayOfWeekNames ? dayOfWeekNamesToArray(props.dayOfWeekNames) : defaultDayOfWeekNames;
  const dayOfWeekSortIdx = getSortIdx(props, new Date());
  const allIntervals = h.getIntervalsForNDays(7, now);
  let hoursDays = [];
  for (let i = 0; i < 7; i++) {
    hoursDays.push({
      dayOfWeek: dayOfWeekNames[i],
      sortIdx: dayOfWeekSortIdx[i],
      intervals: allIntervals.filter(
        (interval) => interval.start.getDay() === i
      ),
      isToday: now.getDay() === i
    });
  }
  const sortFn = (day1, day2) => {
    if (day1.sortIdx === day2.sortIdx) {
      return 0;
    }
    return day1.sortIdx > day2.sortIdx ? 1 : -1;
  };
  hoursDays.sort(sortFn);
  if (props.collapseDays) {
    hoursDays = collapseDays(hoursDays);
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, isClient && /* @__PURE__ */ React.createElement("div", {
    className: c("HoursTable", props.className)
  }, hoursDays.map((dayData) => {
    const intervalStringsBuilderFn = props.intervalStringsBuilderFn || defaultIntervalStringsBuilder;
    const intervalStrings = intervalStringsBuilderFn(
      dayData,
      props.timeOptions
    );
    return /* @__PURE__ */ React.createElement("div", {
      className: c("HoursTable-row", { "is-today": dayData.isToday }),
      key: dayData.sortIdx
    }, /* @__PURE__ */ React.createElement("span", {
      className: "HoursTable-day"
    }, dayData.dayOfWeek), /* @__PURE__ */ React.createElement("span", {
      className: "HoursTable-intervals"
    }, intervalStrings.map((intervalString, idx) => /* @__PURE__ */ React.createElement("span", {
      className: "HoursTable-interval",
      key: idx
    }, intervalString))));
  })));
};
export {
  Hours
};
