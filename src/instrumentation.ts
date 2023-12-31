import { CronJob } from "cron";
import { LogLevel } from "api/logs";
import axios from "axios";
import { init } from "api/logs/init";
import { refreshToken } from "api/instagram";

export async function register(): Promise<void> {
    // Log the start up.
    await axios.post("/api/logs", {
        content: "Server started.",
        level: LogLevel.INFO
    });

    // Set up cron jobs.
    const cronJobs: Array<{ cronTime: string; func: (...args: never[]) => Promise<void> | void; }> = [
        { cronTime: "* * * * *", func: refreshToken },
        { cronTime: "0 0 1 * *", func: async () => (await init())[1]() }
    ];
    for (const { cronTime, func } of cronJobs) 
        void new CronJob(cronTime, func, null, true, "utc");
}