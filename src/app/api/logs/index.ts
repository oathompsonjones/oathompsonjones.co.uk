export enum LogLevel {
    INFO = "INFO",
    WARNING = "WARNING",
    ERROR = "ERROR",
    DEBUG = "DEBUG"
}

export interface ILog {
    content: string;
    level: LogLevel;
    production: boolean;
    timestamp: number;
}
