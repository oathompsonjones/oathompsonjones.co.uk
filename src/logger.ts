/* eslint-disable @typescript-eslint/naming-convention */
import { LogLevel } from "api/logs";

async function info(content: string): Promise<Response> {
    return fetch("/api/logs", {
        body: JSON.stringify({ content, level: LogLevel.INFO }),
        headers: { "Content-Type": "application/json" },
        method: "POST"
    });
}

async function warn(content: string): Promise<Response> {
    return fetch("/api/logs", {
        body: JSON.stringify({ content, level: LogLevel.WARN }),
        headers: { "Content-Type": "application/json" },
        method: "POST"
    });
}

async function error(content: string): Promise<Response> {
    return fetch("/api/logs", {
        body: JSON.stringify({ content, level: LogLevel.ERROR }),
        headers: { "Content-Type": "application/json" },
        method: "POST"
    });
}

async function debug(content: string): Promise<Response> {
    return fetch("/api/logs", {
        body: JSON.stringify({ content, level: LogLevel.DEBUG }),
        headers: { "Content-Type": "application/json" },
        method: "POST"
    });
}

const Logger = { debug, error, info, warn };
export default Logger;