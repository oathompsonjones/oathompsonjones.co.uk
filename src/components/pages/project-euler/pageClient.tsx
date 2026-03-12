"use client";

import { Button, IconButton, Typography } from "@mui/material";
import { type ChangeEvent, type ReactNode, useEffect, useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { getProblem, getSolution, getUtils } from "actions/projectEuler";
import { Code } from "components/pages/project-euler/code";
import { CodeWrapper } from "components/pages/project-euler/codeWrapper";
import Link from "next/link";
import hljs from "highlight.js/lib/common";

/**
 * Renders the interactive Project Euler experience.
 * @param props - The component properties.
 * @param props.initialProblem - Initial problem id from Next.js search params.
 * @returns A Project Euler page view.
 */
export function ProjectEulerClient({ initialProblem }: { initialProblem: number; }): ReactNode {
    const [loading, setLoading] = useState(true);
    const [problem, setProblem] = useState(initialProblem);
    const [{ description, title }, setDescription] = useState({ description: "Loading...", title: "Loading..." });
    const [solution, setSolution] = useState("Loading...");
    const [showUtils, setShowUtils] = useState(false);
    const [utils, setUtils] = useState("Loading...");

    const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setLoading(true);
        setProblem(Math.max(1, Number(e.target.value)));
    };
    const prev = (): void => {
        setLoading(true);
        setProblem((p) => Math.max(1, p - 1));
    };
    const next = (): void => {
        setLoading(true);
        setProblem((p) => p + 1);
    };

    // Handle loading state.
    useEffect(() => {
        if (loading) {
            setDescription({ description: "Loading...", title: "Loading..." });
            setSolution("Loading...");
        }
    }, [loading]);

    // Handle changes to the problem number, with debounce to prevent excessive API calls when input changes rapidly.
    useEffect(() => {
        const timeout = setTimeout(() => {
            const params = new URLSearchParams(window.location.search);

            params.set("problem", problem.toString());
            window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);

            const failedProblem = {
                description: "Failed to fetch the description.",
                title: "Failed to fetch the title.",
            };

            getProblem(problem)
                .then((response) => setDescription(response.success ? response.data : failedProblem))
                .catch(() => setDescription(failedProblem));

            const failedSolution = "// The solution to this problem is not available. I may not have solved it yet.";

            getSolution(problem)
                .then((response) => setSolution(response.success && response.data !== "404: Not Found"
                    ? response.data
                    : failedSolution))
                .catch(() => setSolution(failedSolution));

            setLoading(false);
        }, 300);

        return (): void => clearTimeout(timeout);
    }, [problem]);

    // Handle initial load and highlight code blocks with highlight.js.
    useEffect(() => {
        const failedUtils = "// Something went wrong while fetching the utils file, please try again later.";

        getUtils()
            .then((response) => setUtils(response.success ? response.data : failedUtils))
            .catch(() => setUtils(failedUtils));

        hljs.highlightAll();
    }, []);

    return (
        <>
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
                .plain-input {
                    background: none;
                    border: none;
                    font: inherit;
                    outline: none;
                    padding: 0;
                    margin: 0.5rem;
                    text-align: center;
                    width: ${problem.toString().length}ch;
                }
                .plain-input[type=number]::-webkit-outer-spin-button,
                .plain-input[type=number]::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                .plain-input[type=number] {
                    appearance: textfield;
                    -moz-appearance: textfield;
                }
            `}</style>
            <Typography
                align="center"
                className="monospace"
                color="inherit"
                // eslint-disable-next-line @typescript-eslint/naming-convention
                sx={{ ":after": { content: { md: "'||===>>'" } }, ":before": { content: { md: "'<<===||'" } } }}
                variant="h2"
            >
                Project Euler
            </Typography>
            <div>
                <Typography align="center" color="inherit" variant="h4">
                    <IconButton className="monospace" disabled={problem === 1} onClick={prev}>
                        <strong>&lt;|</strong>
                    </IconButton>
                    <Link className="monospace" href={`https://projecteuler.net/problem=${problem}`}>
                        Problem
                    </Link>
                    <input className="monospace plain-input" onChange={inputHandler} type="number" value={problem} />
                    <IconButton className="monospace" onClick={next}>
                        <strong>|&gt;</strong>
                    </IconButton>
                </Typography>
                <CodeWrapper sx={{ overflow: "auto", padding: "1rem" }}>
                    <MathJaxContext config={{ options: { enableMenu: false } }}>
                        <MathJax dynamic>
                            <Typography
                                align="center"
                                className="monospace"
                                color="text.secondary"
                                // eslint-disable-next-line @typescript-eslint/naming-convention
                                dangerouslySetInnerHTML={{ __html: title }}
                                variant="h5"
                            />
                            <Typography
                                className="monospace"
                                /* eslint-disable @typescript-eslint/naming-convention */
                                dangerouslySetInnerHTML={{ __html: description }}
                                sx={{ ".center": { textAlign: "center" }, ".red": { color: "red" } }}
                                /* eslint-enable @typescript-eslint/naming-convention */
                                variant="body1"
                            />
                        </MathJax>
                    </MathJaxContext>
                </CodeWrapper>
            </div>
            <div>
                <Typography className="monospace" color="inherit" textAlign="center" variant="h4">
                    Solution
                </Typography>
                <Code>{solution}</Code>
            </div>
            <div>
                <Typography className="monospace" color="inherit" textAlign="center" variant="h4">
                    Utils
                    <Button color="primary" onClick={(): void => setShowUtils((s) => !s)} variant="text">
                        ({showUtils ? "Hide" : "Show"})
                    </Button>
                </Typography>
                <Code sx={showUtils ? {} : { display: "none" }}>{utils}</Code>
            </div>
        </>
    );
}
