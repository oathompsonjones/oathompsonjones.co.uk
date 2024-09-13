import { ButtonGroup, IconButton, Paper, Tooltip } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import type { ReactNode } from "react";
import hljs from "highlight.js/lib/common";
import { useState } from "react";

/**
 * Renders a code block.
 * @param props - An object containing the component props.
 * @param props.children - The code to render.
 * @returns The code block.
 */
export function Code({ children }: { children: string; }): ReactNode {
    const [showButtons, setShowButtons] = useState(false);
    const [useLigatures, setUseLigatures] = useState(true);
    const toggleUseLigatures = (): void => setUseLigatures((u) => !u);
    const copyCode = (): void => {
        void navigator.clipboard.writeText(children);
    };

    return (
        <Paper
            sx={{
                border: "3px solid gray",
                overflow: "hidden",
                position: "relative",
                textAlign: "left",
            }}
            onMouseEnter={(): void => setShowButtons(true)}
            onMouseLeave={(): void => setShowButtons(false)}
        >
            <ButtonGroup
                sx={{
                    opacity: showButtons ? 1 : 0,
                    position: "absolute",
                    right: 0,
                    top: 0,
                    transition: "opacity 0.5s",
                }}
                size="small"
            >
                <Tooltip title="Copy to Clipboard" placement="top" arrow>
                    <IconButton onClick={copyCode} sx={{ borderRadius: "inherit" }}>
                        <ContentCopy />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Toggle font ligatures" placement="top" arrow>
                    <IconButton
                        onClick={toggleUseLigatures}
                        sx={{
                            borderRadius: "inherit",
                            fontFamily: "'Fira Code', monospace",
                            fontVariantLigatures: useLigatures ? "contextual" : "none",
                        }}
                    >
                        <strong>&lt;/&gt;</strong>
                    </IconButton>
                </Tooltip>
            </ButtonGroup>
            <pre><code
                className="language-typescript"
                style={{
                    background: "none",
                    fontFamily: "'Fira Code', monospace",
                    fontVariantLigatures: useLigatures ? "contextual" : "none",
                    overflow: "auto",
                    padding: "1rem",
                    width: "100%",
                }}
                // eslint-disable-next-line @typescript-eslint/naming-convention
                dangerouslySetInnerHTML={{ __html: hljs.highlight(children, { language: "typescript" }).value }}
            /></pre>
        </Paper>
    );
}
