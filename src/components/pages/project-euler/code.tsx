"use client";

import { ButtonGroup, IconButton, type SxProps, Tooltip } from "@mui/material";
import { type ReactNode, useCallback, useState } from "react";
import { CodeWrapper } from "./codeWrapper";
import { ContentCopy } from "@mui/icons-material";
import hljs from "highlight.js/lib/common";

const DANGEROUSLY_SET_INNER_HTML = "dangerouslySetInnerHTML";
const HTML = "__html";

/**
 * Renders a code block.
 * @param props - An object containing the component props.
 * @param props.children - The code to render.
 * @param props.sx - Optional styles to apply to the code block.
 * @returns The code block.
 */
export function Code({ children, sx }: { readonly children: string; readonly sx?: SxProps; }): ReactNode {
    const [showButtons, setShowButtons] = useState(false);
    const [useLigatures, setUseLigatures] = useState(true);
    const toggleUseLigatures = useCallback((): void => setUseLigatures((prev) => !prev), []);
    const showControls = useCallback((): void => setShowButtons(true), []);
    const hideControls = useCallback((): void => setShowButtons(false), []);
    const copyCode = useCallback((): void => {
        void navigator.clipboard.writeText(children);
    }, [children]);
    const highlightedHtml = hljs.highlight(children, { language: "typescript" }).value;
    const highlightedCode = { [DANGEROUSLY_SET_INNER_HTML]: { [HTML]: highlightedHtml } };

    return (
        <CodeWrapper
            onMouseEnter={showControls}
            onMouseLeave={hideControls}
            sx={sx ?? {}}
        >
            <ButtonGroup
                size="small"
                sx={{
                    opacity: showButtons ? 1 : 0,
                    position: "absolute",
                    right: 0,
                    top: 0,
                    transition: "opacity 0.5s",
                }}
            >
                <Tooltip arrow placement="top" title="Copy to Clipboard">
                    <IconButton onClick={copyCode} sx={{ borderRadius: "inherit" }}>
                        <ContentCopy />
                    </IconButton>
                </Tooltip>
                <Tooltip arrow placement="top" title="Toggle font ligatures">
                    <IconButton
                        className="monospace"
                        onClick={toggleUseLigatures}
                        sx={{
                            borderRadius: "inherit",
                            fontVariantLigatures: useLigatures ? "contextual" : "none",
                        }}
                    >
                        <strong>&lt;/&gt;</strong>
                    </IconButton>
                </Tooltip>
            </ButtonGroup>
            <pre style={{ margin: 0 }}>
                <code
                    className="monospace language-typescript"
                    style={{
                        background: "none",
                        fontVariantLigatures: useLigatures ? "contextual" : "none",
                        overflow: "auto",
                        padding: "1rem",
                    }}
                    {...highlightedCode}
                />
            </pre>
        </CodeWrapper>
    );
}
