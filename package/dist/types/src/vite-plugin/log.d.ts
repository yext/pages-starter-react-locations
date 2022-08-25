declare type ILogger = {
    timedLog: (opts: TimedLogOpts) => TimedLogFinisher;
};
declare const logger: ILogger;
declare type TimedLogOpts = {
    startLog: string;
};
declare type TimedLogFinisher = {
    fail: (text: string) => void;
    succeed: (text: string) => void;
};
export default logger;
