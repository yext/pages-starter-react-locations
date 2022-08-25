/**
 * @returns a Timer which tracks the time since it was created.
 */
export declare const startTimer: () => Timer;
declare type Timer = {
    stop: () => string;
};
export {};
