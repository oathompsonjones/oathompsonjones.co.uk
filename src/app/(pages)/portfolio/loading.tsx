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

    return (
        <Masonry columns={{ lg: 4, md: 3, sm: 2, xl: 5, xs: 1 }}>
            {Array(20).fill(0).map((_, i) => (
                <Skeleton
                    key={i}
                    sx={{
                        height: {
                            lg: "calc(var(--width) / 8)",
                            md: "calc(var(--width) / 6)",
                            sm: "calc(var(--width) / 4)",
                            xl: "calc(var(--width) / 10)",
                            xs: "calc(var(--width) / 2)",
                        },
                    }}
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    style={{ "--width": `${width}px` }}
                    variant="rounded"
                />
            ))}
        </Masonry>
    );
}
