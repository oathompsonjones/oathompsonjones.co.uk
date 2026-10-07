"use client";

import { Box, GlobalStyles, Skeleton } from "@mui/material";
import { Children, useEffect, useRef, useState } from "react";
import { Masonry } from "@mui/lab";
import type { ReactNode } from "react";

export type SkeletonMasonryProps = {
    readonly children?: ReactNode;
    readonly columns: Record<"lg" | "md" | "sm" | "xl" | "xs", number>;
    readonly count: number;
    readonly fallbackCount: number;
    readonly loading: boolean;
    readonly maxRatio: number;
    readonly minRatio: number;
};

const SPACING = 1;

// Masonry sets an inline `order` on a child once it has been placed; anything without one is not laid out yet.
const UNPLACED_CHILD = "& > :not([data-class]):not([style^='order:']):not([style*='; order:'])";

const KEYFRAMES = "@keyframes masonryFadeIn";

// Real items fade in as they are placed, which looks smoother than popping into position.
const PLACED_ITEM = "& > :not(.MuiSkeleton-root):is([style^='order:'], [style*='; order:'])";

/**
 * Gets a deterministic value between 0 and 1, so that server and client render the same skeletons.
 * @param index - The index of the skeleton.
 * @returns A repeatable pseudo-random number.
 */
function pseudoRandom(index: number): number {
    return Math.abs(Math.sin((index + 1) * 12.9898) * 43758.5453) % 1;
}

/**
 * Gets the aspect ratio of a skeleton tile.
 * @param index - The index of the skeleton.
 * @param minRatio - The minimum height as a multiple of the width.
 * @param maxRatio - The maximum height as a multiple of the width.
 * @returns A CSS aspect ratio.
 */
function ratio(index: number, minRatio: number, maxRatio: number): string {
    return `1 / ${(minRatio + pseudoRandom(index) * (maxRatio - minRatio)).toFixed(2)}`;
}

/**
 * Renders a masonry of items, with placeholder tiles while more are loading.
 *
 * Before any item has been laid out, a CSS-only skeleton is shown. It needs no JavaScript, so it is visible in the
 * server-rendered HTML. The Masonry is kept invisible until it has placed its children, so that unplaced items never
 * flash in the wrong columns.
 * @param props - The component properties.
 * @param props.children - The loaded items.
 * @param props.columns - The responsive column counts.
 * @param props.count - How many tiles to append after the items while loading.
 * @param props.fallbackCount - How many tiles to show before any item is ready.
 * @param props.loading - Whether more items are being loaded.
 * @param props.minRatio - The minimum tile height as a multiple of the width.
 * @param props.maxRatio - The maximum tile height as a multiple of the width.
 * @returns The items followed by loading placeholders.
 */
export function SkeletonMasonry({
    children,
    columns,
    count,
    fallbackCount,
    loading,
    maxRatio,
    minRatio,
}: SkeletonMasonryProps): ReactNode {
    const hasChildren = Children.count(children) > 0;
    const masonryRef = useRef<HTMLDivElement>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const masonry = masonryRef.current;

        if (!hasChildren || masonry === null) {
            setReady(false);

            return (): void => { /* Nothing to clean up. */ };
        }

        const check = (): void => {
            const first = masonry.querySelector<HTMLElement>(":scope > :not([data-class])");

            if (first !== null && first.style.order !== "")
                setReady(true);
        };

        check();
        const observer = new MutationObserver(check);

        observer.observe(masonry, { attributeFilter: ["style"], attributes: true, childList: true, subtree: true });

        return (): void => {
            observer.disconnect();
        };
    }, [hasChildren]);

    const showFallback = hasChildren ? !ready : loading;

    return (
        <Box sx={{ overflowX: "clip", position: "relative" }}>
            {/* Stops the browser pinning the page to the bottom as the masonry grows. */}
            <GlobalStyles styles={{ body: { overflowAnchor: "none" }, html: { overflowAnchor: "none" } }} />
            {showFallback
                ? (
                    <Box sx={{ columnCount: columns, columnGap: SPACING }}>
                        {Array.from({ length: fallbackCount }, (_, i) => (
                            <Skeleton
                                key={i}
                                sx={{
                                    aspectRatio: ratio(i, minRatio, maxRatio),
                                    breakInside: "avoid",
                                    height: "auto",
                                    mb: SPACING,
                                }}
                                variant="rounded"
                            />
                        ))}
                    </Box>
                )
                : null}
            {hasChildren
                ? (
                    <Masonry
                        columns={columns} ref={masonryRef} spacing={SPACING} sx={{
                            [KEYFRAMES]: {
                                from: { opacity: 0, transform: "scale(0.96)" },
                                to: { opacity: 1, transform: "none" },
                            },
                            [PLACED_ITEM]: { animation: "masonryFadeIn 0.5s ease-out both" },
                            [UNPLACED_CHILD]: { visibility: "hidden" },
                            ...ready
                                ? {}
                                : {
                                    inset: 0,
                                    pointerEvents: "none",
                                    position: "absolute",
                                    visibility: "hidden",
                                },
                        }}
                    >
                        {children}
                        {Array.from({ length: loading ? count : 0 }, (_, i) => (
                            <Skeleton
                                key={`skeleton-${i}`}
                                sx={{ aspectRatio: ratio(i, minRatio, maxRatio), height: "auto" }}
                                variant="rounded"
                            />
                        ))}
                    </Masonry>
                )
                : null}
        </Box>
    );
}
