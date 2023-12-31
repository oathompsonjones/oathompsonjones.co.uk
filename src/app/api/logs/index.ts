export const enum LogLevel {
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    DEBUG = "DEBUG"
}

export interface ILog {
    content: string;
    level: LogLevel;
    production: boolean;
    timestamp: number;
}
