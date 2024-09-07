import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Maps the data to a React element.
 * @param content - The content to map.
 * @returns The mapped data.
 */
export function jsonToJSDoc(content: string): ReactNode {
    const markdownLink = /\[([^\]]+)\]\(([^\s)]+)\)/g;
    const markdownLinkWithoutCapture = /\[[^\]]+\]\([^\s)]+\)/g;
    const links: string[] = content.match(markdownLink) ?? [];
    const splitAtLinks: string[] = content.split(markdownLinkWithoutCapture);
    const output: Array<ReactNode | string> = [];

    for (let i = 0, j = 0, k = 0; i < splitAtLinks.length || j < links.length; k++) {
        if (k % 2 === 0) {
            output.push(splitAtLinks[i++]);
        } else {
            const link = links[j++]!;
            const href = link.replace(markdownLink, "$2");
            const label = link.replace(markdownLink, "$1");

            output.push(<Link href={href} key={i}>{label}</Link>);
        }
    }

    return output;
}
