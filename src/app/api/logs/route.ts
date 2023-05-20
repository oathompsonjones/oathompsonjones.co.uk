import type { Collection, Db } from "mongodb";
import Config from "config";
import type { ILog } from ".";
import { LogLevel } from ".";
import { MongoClient } from "mongodb";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

async function init(): Promise<[Collection<ILog>, () => void]> {
    const mongoClient: MongoClient = new MongoClient(Config.databaseURL);
    await mongoClient.connect();
    const database: Db = mongoClient.db("Logs");
    const logsCollection: Collection<ILog> = database.collection("Logs");
    return [logsCollection, (): void => void mongoClient.close()];
}

export async function GET(): Promise<NextResponse> {
    const [logsCollection, close] = await init();
    const logs = await logsCollection.find().toArray();
    close();
    return NextResponse.json(logs);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    const body: unknown = req.json();
    const validBody = typeof body === "object" &&
        body !== null &&
        Object.keys(body).length === 2 &&
        "content" in body &&
        "level" in body &&
        typeof body.content === "string" &&
        body.content !== "" &&
        typeof body.level === "string" &&
        Object.keys(LogLevel).includes(body.level);

    if (!validBody)
        return new NextResponse("Invalid form body.", { status: 400 });

    const { content, level } = body as { content: string; level: LogLevel; };

    const [logsCollection, close] = await init();
    await logsCollection.insertOne({ content, level, timestamp: Date.now() });
    close();
    return new NextResponse("Log successful", { status: 200 });
}
