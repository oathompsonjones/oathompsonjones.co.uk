import type { Collection, Db } from "mongodb";
import Config from "../../../../config.json";
import { MongoClient } from "mongodb";

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

/**
 * Initialises the logs collection.
 * @returns The logs collection and a function to close the connection.
 */
export async function init(): Promise<[Collection<Log>, () => void]> {
    const mongoClient: MongoClient = new MongoClient(Config.databaseURL);

    await mongoClient.connect();
    const database: Db = mongoClient.db("Logs");
    const logsCollection: Collection<Log> = database.collection("Logs");

    return [
        logsCollection,
        (): void => {
            void mongoClient.close();
        },
    ];
}
