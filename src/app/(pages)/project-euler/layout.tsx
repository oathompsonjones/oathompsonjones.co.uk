import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Typography } from "@mui/material";

export const metadata: Metadata = { title: "Oliver Jones | Project Euler" };

/**
 * Sets the title of the page.
 * @param props - The component properties.
 * @param props.children - The children of the page.
 * @returns The children of the page.
 */
export default function Layout({ children }: { children: ReactNode; }): ReactNode {
    return (
        <div>
            {/* eslint-disable-next-line @next/next/no-page-custom-font */}
            <link
                href="https://fonts.googleapis.com/css?family=Fira Code&display=optional"
                rel="stylesheet"
            />
            <link
                href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css"
                rel="stylesheet"
            />
            <style>{/* CSS */`
                .plain-button,
                .plain-input {
                    background: none;
                    border: none;
                    color: inherit;
                    cursor: pointer;
                    font: inherit;
                    outline: inherit;
                    padding: 0;
                    text-align: center;
                    width: 2em;
                }
                .plain-input::-webkit-outer-spin-button,
                .plain-input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                .plain-input[type=number] {
                    appearance: textfield;
                    -moz-appearance: textfield;
                }
                .monospace {
                    font-family: "Fira Code", monospace;
                }
                .red {
                    color: red;
                }
                .center {
                    text-align: center;
                }
            `}</style>
            <Typography
                className="monospace"
                textAlign="center"
                variant="h2"
                color="inherit"
                sx={{
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    ":after": { content: { md: "'||===>>'" } },
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    ":before": { content: { md: "'<<===||'" } },
                }}
            >
                Project Euler
            </Typography>
            {children}
        </div>
    );
}
