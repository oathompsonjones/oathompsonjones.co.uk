import { Divider, Paper, Typography } from "@mui/material";
import type { ICV } from "api/cv";
import Link from "next/link";
import cv from "assets/cv.json";

const data = cv as ICV;

/**
 * Contains the experience segment for my CV page.
 *
 * @returns {React.ReactNode} The Experience element.
 */
export default function Experience(): React.ReactNode {
    // Contains the data for the experience section of my CV.
    const experiences: Array<{ content: React.ReactNode; heading: string; }> = Object.keys(data.Experience).map((experience) => ({
        content: mapData(data.Experience[experience]!),
        heading: experience
    }));

    function mapData(content: string): React.ReactNode {
        const matchingRegExp = /\[([^\]]+)\]\(([^\s)]+)\)/ug;
        const nonMatchingRegExp = /\[[^\]]+\]\([^\s)]+\)/ug;
        const links: string[] = content.match(matchingRegExp) ?? [];
        const splitAtLinks: string[] = content.split(nonMatchingRegExp);
        const output: Array<React.ReactNode | string> = [];
        for (let i = 0, j = 0, k = 0; i < splitAtLinks.length || j < links.length; k++) {
            if (k % 2 === 0) {
                const str = splitAtLinks[i++]!;
                output.push(...str.includes("\n") ? str.split("\n").map((line) => <>{line}<br /></>) : [str]);
            } else {
                const link = links[j++];
                const href = link!.replace(matchingRegExp, "$2");
                const label = link!.replace(matchingRegExp, "$1");
                output.push(<Link href={href}>{label}</Link>);
            }
        }
        return <>{output.flat()}</>;
    }

    return (
        <Paper sx={{ p: "1%" }}>
            <Typography variant="h4">Experience</Typography>
            {
                experiences.map(({ content, heading }) => (
                    <>
                        <Divider sx={{ m: "1.25% 0%" }} />
                        <Typography variant="subtitle1">{heading}</Typography>
                        <Typography variant="body2">{content}</Typography>
                    </>
                ))
            }
        </Paper>
    );
}
