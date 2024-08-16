import type { ReactElement, ReactNode } from "react";
import Link from "next/link";
import cv from "assets/cv.json";
import fs from "fs/promises";

export type CV = {
    bio: string;
    Qualifications: Record<string, string[][] | string>;
    Experience: Record<string, string>;
    Skills: Record<string, string>;
};
const data = cv as CV;

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

/**
 * Generates a LaTeX document from the CV data.
 * @param content - The content of the CV.
 * @returns The LaTeX document.
 */
export async function generateTex(content: string): Promise<string> {
    const skeleton = await fs.readFile("src/assets/cv-skeleton.tex", "utf8");

    return skeleton.replace("%CONTENT%", content);
}

/**
 * Formats the content of the CV.
 * @param content - The content to format.
 * @returns The formatted content.
 */
function format(content: string): string {
    return content
        // eslint-disable-next-line prefer-named-capture-group
        .replace(/\[([^\]]+)\]\(([^\s)]+)\)/g, "\\href{$2}{$1}")
        .replace(/\n\n/g, " \\paragraph{}")
        .replace(/\n/g, " \\")
        // eslint-disable-next-line prefer-named-capture-group
        .replace(/([#&])/g, "\\$1");
}

/**
 * Maps a table to LaTeX.
 * @param table - The table.
 * @returns The LaTeX table.
 */
function mapTable([headings, ...rows]: string[][]): string {
    const arr = [headings!.map((heading) => (heading.length > 0 ? `\\bfseries{${format(heading)}}` : "")), ...rows];
    const lengths = arr[0]!.map((_, i) => Math.max(...arr.map((row) => format(row[i]!).length)));
    const mappedRows = arr.map((row) => `\t${row.map((column, i) => format(column).padEnd(lengths[i]!)).join(" & ")} \\\\`);

    return `\\begin{tabular}{llll}\n${mappedRows.join("\n")}\n\\end{tabular}`;
}

/**
 * Maps a section to LaTeX.
 * @param section - The section.
 * @returns The LaTeX section.
 */
export function mapSection(section: keyof CV): string {
    if (section === "bio")
        return format(data[section]);

    return `${mapSectionHeading(section)}\n${mapSectionContent(section)}`;
}

/**
 * Maps a subsection to LaTeX.
 * @param section - The section.
 * @param subSection - The subsection.
 * @returns The LaTeX subsection.
 */
function mapSubSection(section: keyof Omit<CV, "bio">, subSection: string): string {
    return `${mapSubSectionHeading(subSection)}\n${mapSubSectionContent(section, subSection)}`;
}

/**
 * Maps a section heading to LaTeX.
 * @param heading - The heading.
 * @returns The LaTeX section heading.
 */
function mapSectionHeading(heading: keyof Omit<CV, "bio">): string {
    return `\\section*{${format(heading)}}`;
}

/**
 * Maps a subsection heading to LaTeX.
 * @param heading - The heading.
 * @returns The LaTeX subsection heading.
 */
function mapSubSectionHeading(heading: string): string {
    return `\\subsection*{${format(heading)}}`;
}

/**
 * Maps a subsection content to LaTeX.
 * @param section - The section.
 * @param subSection - The subsection.
 * @returns The LaTeX subsection content.
 */
function mapSectionContent(section: keyof Omit<CV, "bio">): string {
    return Object.keys(data[section]).map((subSection) => mapSubSection(section, subSection)).join("\n");
}

/**
 * Maps a subsection content to LaTeX.
 * @param section - The section.
 * @param subSection - The subsection.
 * @returns The LaTeX subsection content.
 */
function mapSubSectionContent(section: keyof Omit<CV, "bio">, subSection: string): string {
    const subSectionData = data[section][subSection]!;

    return subSectionData instanceof Array ? mapTable(subSectionData) : format(subSectionData);
}
