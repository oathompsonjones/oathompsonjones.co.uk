import type { ReactElement, ReactNode } from "react";
import Link from "next/link";

/**
 * Maps the data to a React element.
 * @param content - The content to map.
 * @returns The mapped data.
 */
export function jsonToJSDoc(content: string): ReactElement {
    // eslint-disable-next-line prefer-named-capture-group
    const matchingRegExp = /\[([^\]]+)\]\(([^\s)]+)\)/g;
    const nonMatchingRegExp = /\[[^\]]+\]\([^\s)]+\)/g;
    const links: string[] = content.match(matchingRegExp) ?? [];
    const splitAtLinks: string[] = content.split(nonMatchingRegExp);
    const output: Array<ReactNode | string> = [];

    for (let i = 0, j = 0, k = 0; i < splitAtLinks.length || j < links.length; k++) {
        if (k % 2 === 0) {
            const str = splitAtLinks[i++]!;

            output.push(...str.includes("\n") ? str.split("\n").map((line, key) => <div key={key}>{line}<br /></div>) : [str]);
        } else {
            const link = links[j++];
            const href = link!.replace(matchingRegExp, "$2");
            const label = link!.replace(matchingRegExp, "$1");

            output.push(<Link href={href}>{label}</Link>);
        }
    }

    return <>{output.flat()}</>;
}
