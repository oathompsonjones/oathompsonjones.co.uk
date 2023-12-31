import { CronJob } from "cron";
import axios from "axios";
import { init } from "api/logs";
import { refreshToken } from "api/instagram";
import { useEffect } from "react";

export function register(): void {
    // Log the start up.
    useEffect(() => void axios.post("/api/logs", "Server started."), []);

    // Set up cron jobs.
    const cronJobs: Array<{ cronTime: string; func: (...args: never[]) => Promise<void> | void; }> = [
        { cronTime: "* * * * *", func: refreshToken },
        { cronTime: "0 0 1 * *", func: async () => void await init() }
    ];
    for (const { cronTime, func } of cronJobs) 
        void new CronJob(cronTime, func, null, true, "utc");
}