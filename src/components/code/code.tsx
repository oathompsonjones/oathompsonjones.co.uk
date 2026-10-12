"use client";

import { ButtonGroup, IconButton, type SxProps, Tooltip } from "@mui/material";
import { ContentCopy, Download } from "@mui/icons-material";
import { type ReactNode, useCallback, useState } from "react";
import { CodeWrapper } from "./codeWrapper";
import hljs from "highlight.js/lib/common";

const DANGEROUSLY_SET_INNER_HTML = "dangerouslySetInnerHTML";
const HTML = "__html";

/**
 * Renders a code block.
 * @param props - An object containing the component props.
 * @param props.children - The code to render.
 * @param props.downloadFilename - The suggested downloaded filename.
 * @param props.language - The highlight.js language identifier.
 * @param props.sx - Optional styles to apply to the code block.
 * @returns The code block.
 */
export function Code({
    children,
    downloadFilename,
    language = "typescript",
    sx,
}: {
    readonly children: string;
    readonly downloadFilename?: string;
    readonly language?: string;
    readonly sx?: SxProps;
}): ReactNode {
    const [useLigatures, setUseLigatures] = useState(true);
    const toggleUseLigatures = useCallback((): void => setUseLigatures((prev) => !prev), []);
    const copyCode = useCallback((): void => {
        void navigator.clipboard.writeText(children);
    }, [children]);
    const handleDownload = useCallback((): void => {
        let defaultExtension = language;

        if (language === "typescript")
            defaultExtension = "ts";
        else if (language === "bash")
            defaultExtension = "sh";
        else if (language === "plaintext")
            defaultExtension = "txt";

        const filename = (downloadFilename ?? `code.${defaultExtension}`)
            .replaceAll(/[\\/:*?"<>|]/g, "-")
            .replaceAll(/\p{Cc}/gu, "-")
            .replaceAll(/^\.+|\.+$/g, "")
            .trim() || `code.${defaultExtension}`;
        const url = URL.createObjectURL(new Blob([children], { type: "text/plain;charset=utf-8" }));
        const anchor = document.createElement("a");

        anchor.href = url;
        anchor.download = filename;
        anchor.click();
        window.setTimeout(() => URL.revokeObjectURL(url), 0);
    }, [children, downloadFilename, language]);
    const highlightedHtml = hljs.getLanguage(language) === undefined
        ? hljs.highlightAuto(children).value
        : hljs.highlight(children, { language }).value;
    const highlightedCode = { [DANGEROUSLY_SET_INNER_HTML]: { [HTML]: highlightedHtml } };

    return (
        // eslint-disable-next-line @typescript-eslint/naming-convention -- CSS selector.
        <CodeWrapper sx={{ "&:hover .MuiButtonGroup-root": { opacity: 1 }, ...sx }}>
            <ButtonGroup
                size="small"
                /* eslint-disable @typescript-eslint/naming-convention -- CSS selectors. */
                sx={{
                    "&:has(:focus-visible)": { opacity: 1 },
                    "@media (hover: none)": { opacity: 1 },
                    opacity: 0.3,
                    position: "absolute",
                    right: 0,
                    top: 0,
                    transition: "opacity 0.2s",
                    zIndex: 1,
                }}
                /* eslint-enable @typescript-eslint/naming-convention */
            >
                <Tooltip arrow placement="top" title="Copy to Clipboard">
                    <IconButton aria-label="Copy code" onClick={copyCode} sx={{ borderRadius: "inherit" }}>
                        <ContentCopy />
                    </IconButton>
                </Tooltip>
                <Tooltip arrow placement="top" title="Download code">
                    <IconButton aria-label="Download code" onClick={handleDownload} sx={{ borderRadius: "inherit" }}>
                        <Download />
                    </IconButton>
                </Tooltip>
                <Tooltip
                    arrow
                    placement="top"
                    title={useLigatures ? "Disable font ligatures" : "Enable font ligatures"}
                >
                    <IconButton
                        aria-label={useLigatures ? "Disable font ligatures" : "Enable font ligatures"}
                        aria-pressed={useLigatures}
                        className="monospace"
                        onClick={toggleUseLigatures}
                        sx={{ borderRadius: "inherit" }}
                    >
                        <strong
                            style={{
                                fontFeatureSettings: useLigatures ? "\"calt\" 1, \"liga\" 1" : "\"calt\" 0, \"liga\" 0",
                                fontVariantLigatures: useLigatures ? "normal" : "none",
                                letterSpacing: useLigatures ? "normal" : "0.001px",
                            }}
                        >
                            &lt;/&gt;
                        </strong>
                    </IconButton>
                </Tooltip>
            </ButtonGroup>
            <pre
                style={{
                    boxSizing: "border-box",
                    margin: 0,
                    maxWidth: "100%",
                    overflow: "auto",
                    whiteSpace: "pre",
                }}
            >
                <code
                    className={`hljs monospace language-${language}`}
                    style={{
                        background: "none",
                        display: "block",
                        fontFeatureSettings: useLigatures ? "\"calt\" 1, \"liga\" 1" : "\"calt\" 0, \"liga\" 0",
                        fontVariantLigatures: useLigatures ? "normal" : "none",
                        letterSpacing: useLigatures ? "normal" : "0.001px",
                        minWidth: "max-content",
                        padding: "1rem",
                    }}
                    {...highlightedCode}
                />
            </pre>
        </CodeWrapper>
    );
}
