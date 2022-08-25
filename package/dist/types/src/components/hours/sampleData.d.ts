import { HoursType } from "./";
export declare const HOURS: HoursType;
export declare const HOURS_WITH_HOLIDAY: HoursType;
export declare const HOURS_WITH_REOPEN_DATE: {
    monday: {
        isClosed: boolean;
        openIntervals: {
            start: string;
            end: string;
        }[];
    };
    tuesday: {
        isClosed: boolean;
        openIntervals: {
            start: string;
            end: string;
        }[];
    };
    wednesday: {
        isClosed: boolean;
        openIntervals: {
            start: string;
            end: string;
        }[];
    };
    thursday: {
        isClosed: boolean;
        openIntervals: {
            start: string;
            end: string;
        }[];
    };
    friday: {
        isClosed: boolean;
        openIntervals: {
            start: string;
            end: string;
        }[];
    };
    saturday: {
        isClosed: boolean;
        openIntervals: {
            start: string;
            end: string;
        }[];
    };
    sunday: {
        isClosed: boolean;
        openIntervals: {
            start: string;
            end: string;
        }[];
    };
    reopenDate: string;
};
