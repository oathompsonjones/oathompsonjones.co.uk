"use client";

import { Masonry } from "@mui/lab";
import type { ReactElement } from "react";
import { Skeleton } from "@mui/material";
import useWindowSize from "hooks/useWindowSize";

/**
 * Renders a skeleton page while loading.
 * @returns The skeleton page.
 */
export default function Loading(): ReactElement {
    const { width } = useWindowSize();

    const skeletonCount = 20;
    const heights = Array(skeletonCount).fill(0).map(() => (Math.random() / 2 + 0.5) * width);

    return (
        <>
            <Masonry columns={{ lg: 6, sm: 3, xs: 1 }}>
                {Array(skeletonCount).fill(0).map((_, i) => (
                    <Skeleton
                        key={i}
                        sx={{
                            borderRadius: "1vmin",
                            height: {
                                lg: heights[i]! / 6,
                                sm: heights[i]! / 3,
                                xs: heights[i]!,
                            },
                        }}
                        variant="rectangular"
                    />
                ))}
            </Masonry>
        </>
    );
}
