import { Paper } from "@mui/material";
import type { ReactNode } from "react";
import hljs from "highlight.js/lib/common";

/**
 * Renders a code block.
 * @param props - An object containing the component props.
 * @param props.children - The code to render.
 * @returns The code block.
 */
export function Code({ children }: { children: string; }): ReactNode {
    return (
        <Paper
            component="pre"
            sx={{
                border: "3px solid gray",
                borderRadius: "2vmin",
                overflow: "hidden",
                textAlign: "left",
            }}
        ><code
                className="language-typescript"
                style={{
                    background: "none",
                    fontFamily: "'Fira Code', monospace",
                    overflow: "auto",
                    padding: "1rem",
                    width: "100%",
                }}
                // eslint-disable-next-line @typescript-eslint/naming-convention
                dangerouslySetInnerHTML={{ __html: hljs.highlight(children, { language: "typescript" }).value }}
            /></Paper>
    );
}
