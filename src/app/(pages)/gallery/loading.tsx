"use client";

import { Masonry } from "@mui/lab";
import type { ReactNode } from "react";
import { Skeleton } from "@mui/material";
import { useWindowSize } from "hooks/useWindowSize";

/**
 * Renders a skeleton page while loading.
 * @returns The skeleton page.
 */
export default function Loading(): ReactNode {
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
                                lg: "calc(var(--height) / 6)",
                                sm: "calc(var(--height) / 3)",
                                xs: "var(--height)",
                            },
                        }}
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        style={{ "--height": `${heights[i]!}px` }}
                        variant="rectangular"
                    />
                ))}
            </Masonry>
        </>
    );
}
