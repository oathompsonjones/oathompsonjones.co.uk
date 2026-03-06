"use client";

import { Button, IconButton, Typography } from "@mui/material";
import type { ChangeEvent, ReactNode } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { getProblem, getSolution, getUtils } from "actions/projectEuler";
import { useEffect, useState } from "react";
import { Code } from "components/pages/project-euler/code";
import { CodeWrapper } from "components/pages/project-euler/codeWrapper";
import Link from "next/link";
import hljs from "highlight.js/lib/common";

/**
 * This page contains my project euler solutions.
 * @returns An element displaying my project euler solutions.
 */
export default function ProjectEuler(): ReactNode {
    const [loading, setLoading] = useState(true);
    const [problem, setProblem] = useState(1);
    const [{ description, title }, setDescription] = useState({ description: "Loading...", title: "Loading..." });
    const [solution, setSolution] = useState("Loading...");
    const [showUtils, setShowUtils] = useState(false);
    const [utils, setUtils] = useState("Loading...");

    const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => setProblem(Math.max(1, Number(e.target.value)));
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
            window.location.hash = problem.toString();

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
        if (window.location.hash !== "" && !isNaN(Number(window.location.hash.slice(1))))
            setProblem(Number(window.location.hash.slice(1)));

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
                className="monospace"
                align="center"
                variant="h2"
                color="inherit"
                // eslint-disable-next-line @typescript-eslint/naming-convention
                sx={{ ":after": { content: { md: "'||===>>'" } }, ":before": { content: { md: "'<<===||'" } } }}
            >
                Project Euler
            </Typography>
            <div>
                <Typography align="center" variant="h4" color="inherit">
                    <IconButton onClick={prev} className="monospace" disabled={problem === 1}>
                        <strong>&lt;|</strong>
                    </IconButton>
                    <Link className="monospace" href={`https://projecteuler.net/problem=${problem}`}>
                    Problem
                    </Link>
                    <input className="monospace plain-input" type="number" value={problem} onChange={inputHandler} />
                    <IconButton onClick={next} className="monospace">
                        <strong>|&gt;</strong>
                    </IconButton>
                </Typography>
                <CodeWrapper sx={{ overflow: "auto", padding: "1rem" }}>
                    <MathJaxContext config={{ options: { enableMenu: false } }}>
                        <MathJax dynamic>
                            <Typography
                                className="monospace"
                                align="center"
                                color="secondary"
                                variant="h5"
                                // eslint-disable-next-line @typescript-eslint/naming-convention
                                dangerouslySetInnerHTML={{ __html: title }}
                            />
                            <Typography
                                className="monospace"
                                variant="body1"
                                /* eslint-disable @typescript-eslint/naming-convention */
                                sx={{ ".center": { textAlign: "center" }, ".red": { color: "red" } }}
                                dangerouslySetInnerHTML={{ __html: description }}
                                /* eslint-enable @typescript-eslint/naming-convention */
                            />
                        </MathJax>
                    </MathJaxContext>
                </CodeWrapper>
            </div>
            <div>
                <Typography className="monospace" textAlign="center" variant="h4" color="inherit">
                    Solution
                </Typography>
                <Code>{solution}</Code>
            </div>
            <div>
                <Typography className="monospace" textAlign="center" variant="h4" color="inherit">
                    Utils
                    <Button onClick={(): void => setShowUtils((s) => !s)} variant="text" color="primary">
                        ({showUtils ? "Hide" : "Show"})
                    </Button>
                </Typography>
                <Code sx={showUtils ? {} : { display: "none" }}>{utils}</Code>
            </div>
        </>
    );
}
