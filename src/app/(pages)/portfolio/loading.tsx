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
            <Masonry columns={{ lg: 6, sm: 3, xs: 1 }}>
                {Array(20).fill(0).map(() => <Skeleton
                    animation="pulse"
                    sx={{ height: { lg: width / 4, md: width / 3, sm: width / 2, xl: width / 5, xs: width } }}
                    variant="rectangular"
                />)}
            </Masonry>
        </>
    );
}
