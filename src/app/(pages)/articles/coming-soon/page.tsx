import type { ReactNode } from "react";
import { Typography } from "@mui/material";

/**
 * This page is a placeholder for future articles. It informs users that more content will be added soon.
 * @returns A "Coming Soon" page for articles.
 */
export default function ComingSoon(): ReactNode {
    return (
        <div>
            <Typography variant="h2" align="center">Coming Soon</Typography>
            <Typography>More articles will be added in the future. Stay tuned!</Typography>
        </div>
    );
}
