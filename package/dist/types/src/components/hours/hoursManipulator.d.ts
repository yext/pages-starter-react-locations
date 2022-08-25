import { DayType, HolidayType, IntervalType, HoursType } from "./types";
export declare class HoursIntervalManipulator {
    end: Date;
    start: Date;
    /**
     * @param {Date} date the Date for the day on which the interval starts
     * @param {interval} interval the Yext Streams interval data
     */
    constructor(date: Date, interval: IntervalType);
    /**
     * @param {Date} date A moment in time
     * @returns {boolean} True if the given moment is within the interval
     */
    contains(date: Date): boolean;
    /**
     * @param {Object} opts intl.DateTimeFormatOptions
     * @param {string} locale defaults to 'en-US'
     * @returns {string} representation of this interval's start time
     */
    getStartTime(locale?: string, opts?: Intl.DateTimeFormatOptions): string;
    /**
     * @param {Object} opts intl.DateTimeFormatOptions
     * @param {string} locale defaults to 'en-US'
     * @returns {string} representation of this interval's end time
     */
    getEndTime(locale?: string, opts?: Intl.DateTimeFormatOptions): string;
    /**
     * @param {HoursIntervalManipulator} other
     * @returns {boolean} if this interval and 'other' have the same start/end
     */
    timeIsEqualTo(other: HoursIntervalManipulator): boolean;
}
export declare class HoursManipulator {
    holidayHoursByDate: Record<string, HolidayType>;
    hours: HoursType;
    /**
     * @param {Object} hours Hours object in the format returned by Yext Streams
     */
    constructor(hours: HoursType);
    /**
     * @param {Date} date A moment in time
     * @returns {HoursIntervalManipulator?} The first interval that contains the given moment, null if none
     */
    getInterval(date: Date): HoursIntervalManipulator | null;
    /**
     * @returns {HoursIntervalManipulator?} The first interval that contains the current time, null if none
     */
    getCurrentInterval(): HoursIntervalManipulator | null;
    /**
     * @param {Date} date A moment in time
     * @returns {HoursIntervalManipulator?} The next interval that hasn't started as of the given moment
     */
    getIntervalAfter(date: Date): HoursIntervalManipulator | null;
    /**
     * @returns {HoursIntervalManipulator?} The next interval that hasn't started as of the current time
     */
    getNextInterval(): HoursIntervalManipulator | null;
    /**
     * @param {number} n number of days to check
     * @param {Date} startDate first day to check
     * @returns {HoursIntervalManipulator[]} list of intervals in range [startDate, startDate+7]
     */
    getIntervalsForNDays(n: number, startDate: Date): HoursIntervalManipulator[];
    /**
     * @param {Date} date The day to get the hours for
     * @returns {Object?} The daily holiday hours object from the original Streams response for the
     *   given date, null if none
     */
    getHolidayHours(date: Date): HolidayType | null;
    /**
     * @param {Date} date The day to get the hours for
     * @returns {Object?} The daily normal hours object from the original Streams response for the
     *   given date, null if none
     */
    getNormalHours(date: Date): DayType | null;
    /**
     * @param {Date} date The day to get the hours for
     * @returns {Object?} The daily hours object from the original Streams response for the given
     *   date, null if none
     */
    getHours(date: Date): DayType | HolidayType | null;
    /**
     * @param {Date} date A day
     * @returns {Boolean} True if the given day has holiday hours
     */
    isHoliday(date: Date): boolean;
    /**
     * Yext platform uses the field `hours.reopenDate` to indicate an entity is
     *  temporarily closed for more than one day.
     * @param {Date} date
     * @returns {Boolean} True if the given date is before 'reopenDate'
     */
    isTemporarilyClosedAt(targetDate: Date): boolean;
    /**
     * @param {Date} date A moment in time
     * @returns {Boolean} True if the given moment falls within any interval
     */
    isOpenAt(date: Date): boolean;
    /**
     * @returns {Boolean} True if the current time falls within any interval
     */
    isOpenNow(): boolean;
    /**
     * Convert ISO Date which have 1-based months, to Yext date string which have 0-based months
     * @param date a moment in time
     * @returns a Yext date string
     */
    transformDateToYext(date: Date): string;
}
/**
 * @param {Array<any>} arr Any array
 * @param {number} n amount to shift
 * @returns {Array<any>} a new array shifted 'n' elements to the right, looping from the end back to the start
 */
export declare function arrayShift(arr: Array<any>, n: number): Array<any>;
/**
 * @param {HoursIntervalManipulator[]} il1
 * @param {HoursIntervalManipulator[]} il2
 * @returns {boolean} whether the two intervals lists are equal
 */
export declare function intervalsListsAreEqual(il1: HoursIntervalManipulator[], il2: HoursIntervalManipulator[]): boolean;
