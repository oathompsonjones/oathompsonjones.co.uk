export const enum LogLevel {
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    DEBUG = "DEBUG",
}

export type Log = {
    content: string;
    level: LogLevel;
    production: boolean;
    timestamp: number;
};
