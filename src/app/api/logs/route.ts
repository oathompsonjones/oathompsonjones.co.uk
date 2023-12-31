import type { LogLevel } from ".";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { init } from ".";


export async function GET(req: NextRequest): Promise<NextResponse> {
    const [logsCollection, close] = await init();
    const logs = await logsCollection.find().toArray();
    close();
    const mappedLogs = logs
        .reverse()
        .filter((log) => new URL(req.url).searchParams.get("production") === null || log.production)
        .map((log) => {
            const dateTime = new Date(log.timestamp).toUTCString();
            const production = log.production ? "production" : "dev".padEnd(10);
            return `${dateTime}: ${production} ${log.level} - ${log.content.replace(/\n/ug, " \\n ")}`;
        }).join("\n");
    return new NextResponse(mappedLogs, { status: 200 });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    if (req.headers.get("content-type") !== "application/json")
        return new NextResponse("Invalid form body. Header 'content-type' must be of type 'application/json'.", { status: 400 });

    const body: unknown = await req.json();
    const validBody = typeof body === "object" &&
        body !== null &&
        Object.keys(body).length === 2 &&
        "content" in body &&
        "level" in body &&
        typeof body.content === "string" &&
        body.content !== "" &&
        typeof body.level === "string" &&
        ["INFO", "WARN", "ERROR", "DEBUG"].includes(body.level);

    if (!validBody)
        return new NextResponse("Invalid form body.", { status: 400 });

    const { content, level } = body as { content: string; level: LogLevel; };
    const timestamp = Date.now();

    const [logsCollection, close] = await init();
    await logsCollection.insertOne({ content, level, production: process.platform === "linux", timestamp });
    close();
    // eslint-disable-next-line no-console
    console[level.toLowerCase() as "debug" | "error" | "info" | "warn"](timestamp, content);
    return new NextResponse("Log successful", { status: 200 });
}
