import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export type Response = {
    description: string;
    title: string;
};

/**
 * Gets information about a project Euler problem.
 * @param req - The incoming request.
 * @returns Information about a project Euler problem.
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
    const query = req.nextUrl.searchParams.get("problem");

    if (query === null || isNaN(parseInt(query, 10)) || parseInt(query, 10) < 1)
        return new NextResponse("Invalid request.", { status: 400 });

    const descriptionData = await fetch(`https://projecteuler.net/minimal=${query}`).then(async (res) => res.text());
    const description = descriptionData
        .replaceAll(/href="(.+)"/g, "href=https://projecteuler.net/$1")
        .replaceAll(/\${1,2}([^$]+)\${1,2}/g, "\\($1\\)");

    const titleData = await fetch("https://projecteuler.net/minimal=problems;csv").then(async (res) => res.text());
    const title = titleData.split("\n").find((line) => line.startsWith(`${query},`))?.split(",")[1] ?? "Unknown";

    return NextResponse.json({ description, title });
}
