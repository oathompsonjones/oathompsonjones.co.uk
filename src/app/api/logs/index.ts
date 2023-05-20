export enum LogLevel {
    INFO = "INFO",
    WARNING = "WARNING",
    ERROR = "ERROR",
    DEBUG = "DEBUG"
}

export interface ILog {
    timestamp: number;
    content: string;
    level: LogLevel;
}
