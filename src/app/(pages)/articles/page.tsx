import { Article } from "components/pages/articles/article";
import { Masonry } from "@mui/lab";
import type { ReactNode } from "react";
import { Typography } from "@mui/material";

/**
 * This page contains a collection of articles that I have written.
 * @returns An articles page.
 */
export default function Articles(): ReactNode {
    return (
        <div>
            <Typography variant="h2" align="center" gutterBottom>Articles</Typography>
            <Masonry columns={/* { lg: 4, md: 3, sm: 2, xl: 5, xs: 1 } */ 2}>
                <Article
                    title="Project Euler"
                    summary="A collection of solutions to Project Euler problems."
                />
                <Article
                    title="Coming Soon"
                    summary="More articles will be added in the future. Stay tuned!"
                />
                {/* TODO: Add more articles which can be dynamically loaded from a GitHub repo. */}
            </Masonry>
        </div>
    );
}
