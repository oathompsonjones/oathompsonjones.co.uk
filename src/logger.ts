/* eslint-disable @typescript-eslint/naming-convention */
import { LogLevel } from "api/logs";

/**
 * Sends an info log to the server.
 * @param content - The content of the log.
 * @returns The response.
 */
async function info(content: string): Promise<Response> {
    return fetch("/api/logs", {
        body: JSON.stringify({ content, level: LogLevel.INFO }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
    });
}

/**
 * Sends a warning log to the server.
 * @param content - The content of the log.
 * @returns The response.
 */
async function warn(content: string): Promise<Response> {
    return fetch("/api/logs", {
        body: JSON.stringify({ content, level: LogLevel.WARN }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
    });
}

/**
 * Sends an error log to the server.
 * @param content - The content of the log.
 * @returns The response.
 */
async function error(content: string): Promise<Response> {
    return fetch("/api/logs", {
        body: JSON.stringify({ content, level: LogLevel.ERROR }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
    });
}

/**
 * Sends a debug log to the server.
 * @param content - The content of the log.
 * @returns The response.
 */
async function debug(content: string): Promise<Response> {
    return fetch("/api/logs", {
        body: JSON.stringify({ content, level: LogLevel.DEBUG }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
    });
}

const Logger = { debug, error, info, warn };

export default Logger;
