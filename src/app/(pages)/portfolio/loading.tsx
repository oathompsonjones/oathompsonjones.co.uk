"use client";

import { Masonry } from "@mui/lab";
import { Skeleton } from "@mui/material";
import useWindowSize from "hooks/useWindowSize";
import type { ReactElement } from "react";

/**
 * Renders a skeleton page while loading.
 * @returns The skeleton page.
 */
export default function Loading(): ReactElement {
    const { width } = useWindowSize();
    
    return (
        <>
            <Masonry columns={{ lg: 4, md: 3, sm: 2, xl: 5, xs: 1 }}>
                {Array(20).fill(0).map((_, i) => <Skeleton
                    key={i}
                    sx={{
                        height: {
                            lg: width / 8,
                            md: width / 6,
                            sm: width / 4,
                            xl: width / 10,
                            xs: width / 2,
                        }
                    }}
                    variant="rounded"
                />)}
            </Masonry>
        </>
    );
}
