import { CronJob } from "cron";
import Logger from "logger";
import { init } from "api/logs/init";
import { refreshToken } from "api/instagram";

/**
 * Registers the server.
 * @returns Void.
 */
export async function register(): Promise<void> {
    // Log the start up.
    await Logger.info("Server started.");

    // Set up cron jobs.
    const cronJobs: Array<{ cronTime: string; func: (...args: never[]) => Promise<void> | void; }> = [
        // Refresh the Instagram token every minute.
        { cronTime: "* * * * *", func: refreshToken },
        // Fetch the logs every month to prevent MongoDB from closing the database.
        { cronTime: "0 0 1 * *", func: async () => (await init())[1]() },
        // Log the time every second.
        { cronTime: "* * * * * *", func: () => console.info(new Date().toISOString()) },
    ];

    for (const { cronTime, func } of cronJobs)
        void new CronJob(cronTime, func, null, true, "utc");
}
