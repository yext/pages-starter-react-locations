const dayKeys = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday"
];
class HoursIntervalManipulator {
  end;
  start;
  constructor(date, interval) {
    this.end = new Date(date);
    this.start = new Date(date);
    [interval.start, interval.end].forEach((time) => {
      if (time.split(":").length != 2) {
        throw new Error(
          `expected interval start and end data to be in the format "HH:MM"`
        );
      }
    });
    const [startHour, startMinute] = interval.start.split(":");
    const [endHour, endMinute] = interval.end.split(":");
    this.end.setHours(Number(endHour), Number(endMinute));
    this.start.setHours(Number(startHour), Number(startMinute));
    if (this.end < this.start) {
      this.end.setDate(this.end.getDate() + 1);
    }
    if (this.end.getMinutes() === 59) {
      this.end.setMinutes(60);
    }
  }
  contains(date) {
    return this.start <= date && date < this.end;
  }
  getStartTime(locale, opts) {
    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
      ...opts
    };
    return this.start.toLocaleString(locale || "en-US", timeOptions);
  }
  getEndTime(locale, opts) {
    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
      ...opts
    };
    return this.end.toLocaleString(locale || "en-US", timeOptions);
  }
  timeIsEqualTo(other) {
    const startEqual = this.getStartTime() === other.getStartTime();
    const endEqual = this.getEndTime() === other.getEndTime();
    return startEqual && endEqual;
  }
}
class HoursManipulator {
  holidayHoursByDate;
  hours;
  constructor(hours) {
    this.holidayHoursByDate = Object.fromEntries(
      (hours.holidayHours || []).map((hours2) => [hours2.date, hours2])
    );
    this.hours = hours;
  }
  getInterval(date) {
    if (this.isTemporarilyClosedAt(date)) {
      return null;
    }
    const priorDate = new Date(date);
    priorDate.setDate(priorDate.getDate() - 1);
    for (const hoursDate of [priorDate, date]) {
      const hours = this.getHours(hoursDate);
      if (hours && !hours.isClosed) {
        for (const interval of hours.openIntervals || []) {
          const hoursInterval = new HoursIntervalManipulator(
            hoursDate,
            interval
          );
          if (hoursInterval.contains(date)) {
            return hoursInterval;
          }
        }
      }
    }
    return null;
  }
  getCurrentInterval() {
    return this.getInterval(new Date());
  }
  getIntervalAfter(date) {
    const intervalsList = this.getIntervalsForNDays(7, date);
    const sortFn = (interval1, interval2) => {
      if (interval1.start === interval2.start)
        return 0;
      return interval1.start > interval2.start ? 1 : -1;
    };
    const sortedIntervals = intervalsList.sort(sortFn);
    for (const [idx, hoursInterval] of sortedIntervals.entries()) {
      if (hoursInterval.contains(date)) {
        if (sortedIntervals.length > idx + 1) {
          return sortedIntervals[idx + 1];
        }
      }
    }
    for (const hoursInterval of sortedIntervals) {
      if (hoursInterval.start > date) {
        return hoursInterval;
      }
    }
    return null;
  }
  getNextInterval() {
    return this.getIntervalAfter(new Date());
  }
  getIntervalsForNDays(n, startDate) {
    const intervalsList = [];
    for (let i = 0; i < n; i++) {
      const theDate = new Date(startDate);
      theDate.setDate(theDate.getDate() + i);
      const hours = this.getHours(theDate);
      if (hours && !hours.isClosed) {
        intervalsList.push(
          ...hours.openIntervals.map(
            (interval) => new HoursIntervalManipulator(theDate, interval)
          )
        );
      }
    }
    return intervalsList;
  }
  getHolidayHours(date) {
    if (this.isTemporarilyClosedAt(date)) {
      return null;
    }
    return this.holidayHoursByDate[this.transformDateToYext(date)] || null;
  }
  getNormalHours(date) {
    if (this.isTemporarilyClosedAt(date)) {
      return null;
    }
    return this.hours[dayKeys[date.getDay()]];
  }
  getHours(date) {
    return this.getHolidayHours(date) || this.getNormalHours(date);
  }
  isHoliday(date) {
    return !!this.getHolidayHours(date);
  }
  isTemporarilyClosedAt(targetDate) {
    if (!this.hours.reopenDate) {
      return false;
    }
    if (this.transformDateToYext(targetDate) < this.hours.reopenDate) {
      return true;
    }
    return false;
  }
  isOpenAt(date) {
    if (this.isTemporarilyClosedAt(date)) {
      return false;
    }
    return !!this.getInterval(date);
  }
  isOpenNow() {
    return this.isOpenAt(new Date());
  }
  transformDateToYext(date) {
    let [year, month, day] = date.toISOString().split("T")[0].split("-");
    const zeroBasedMonth = Number(month) - 1;
    month = zeroBasedMonth < 10 ? "0" + zeroBasedMonth : zeroBasedMonth.toString();
    return `${year}-${month}-${day}`;
  }
}
function arrayShift(arr, n) {
  let myArr = [...arr];
  n = n % myArr.length;
  return myArr.concat(myArr.splice(0, myArr.length - n));
}
function intervalsListsAreEqual(il1, il2) {
  if (il1.length != il2.length) {
    return false;
  }
  for (const [idx, interval] of il1.entries()) {
    if (!interval.timeIsEqualTo(il2[idx])) {
      return false;
    }
  }
  return true;
}
export {
  HoursIntervalManipulator,
  HoursManipulator,
  arrayShift,
  intervalsListsAreEqual
};
