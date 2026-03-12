import { NextResponse } from "next/server";
import { getInstagramPostsPage } from "actions/instagram";

const DEFAULT_PAGE_SIZE = 6;

/**
 * Parses a page size value from the request query.
 * @param value - The query value.
 * @returns A safe page size.
 */
function getPageSize(value: string | null): number {
    if (value === null)
        return DEFAULT_PAGE_SIZE;

    const parsed = Number.parseInt(value, 10);

    if (Number.isNaN(parsed) || parsed <= 0)
        return DEFAULT_PAGE_SIZE;

    return Math.min(parsed, DEFAULT_PAGE_SIZE * 2);
}

/**
 * Returns one cursor-based page of Instagram posts for infinite scrolling.
 * @param request - The incoming HTTP request.
 * @returns A JSON response containing an Instagram page.
 */
export async function GET(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const after = searchParams.get("after");
    const size = getPageSize(searchParams.get("size"));

    const response = await getInstagramPostsPage({ after, size });

    if (!response.success) {
        return NextResponse.json(
            {
                error: response.error?.message ?? "Failed to fetch Instagram posts.",
                success: false,
            },
            { status: 500 },
        );
    }

    return NextResponse.json({
        data: response.data,
        success: true,
    });
}
