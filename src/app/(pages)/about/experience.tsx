import { Divider, Typography } from "@mui/material";
import type { ReactElement, ReactNode } from "react";
import type { CV } from "api/cv";
import Link from "next/link";
import cv from "assets/cv.json";

const data = cv as CV;

/**
 * Contains the experience segment for my CV page.
 * @returns The Experience element.
 */
export default function Experience(): ReactElement {
    // Contains the data for the experience section of my CV.
    const experiences: Array<{ content: ReactElement; heading: string; }> = Object.keys(data.Experience).map((experience) => ({
        content: mapData(data.Experience[experience]!),
        heading: experience,
    }));

    /**
     * Maps the data to a React element.
     * @param content - The content to map.
     * @returns The mapped data.
     */
    function mapData(content: string): ReactElement {
        // eslint-disable-next-line prefer-named-capture-group
        const matchingRegExp = /\[([^\]]+)\]\(([^\s)]+)\)/g;
        const nonMatchingRegExp = /\[[^\]]+\]\([^\s)]+\)/g;
        const links: string[] = content.match(matchingRegExp) ?? [];
        const splitAtLinks: string[] = content.split(nonMatchingRegExp);
        const output: Array<ReactNode | string> = [];

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
        <>
            <Typography variant="h3">Experience</Typography>
            {experiences.map(({ content, heading }) => (
                <>
                    <Divider />
                    <Typography variant="subtitle1">{heading}</Typography>
                    <Typography variant="body2">{content}</Typography>
                </>
            ))}
        </>
    );
}
