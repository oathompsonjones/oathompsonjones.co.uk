"use server";
import type { Collection, Db } from "mongodb";
import Config from "config";
import type { ILog } from ".";
import { MongoClient } from "mongodb";

export async function init(): Promise<[Collection<ILog>, () => void]> {
    const mongoClient: MongoClient = new MongoClient(Config.databaseURL);
    await mongoClient.connect();
    const database: Db = mongoClient.db("Logs");
    const logsCollection: Collection<ILog> = database.collection("Logs");
    return [logsCollection, (): void => void mongoClient.close()];
}