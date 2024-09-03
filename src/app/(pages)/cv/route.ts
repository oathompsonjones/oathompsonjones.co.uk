import { NextResponse } from "next/server";
import cv from "assets/cv.json";
import fs from "fs/promises";
import pdflatex from "node-pdflatex";

export type CV = {
    Bio: string;
    Qualifications: Record<string, Record<string, Record<string, string>> | { summary: string; grades: string[]; }>;
    Experience: Record<string, string>;
    Volunteering: Record<string, string>;
    Skills: Record<string, string>;
};

const data = cv as CV;

/**
 * Generates a LaTeX document from the CV data.
 * @returns The LaTeX document.
 */
async function generateTex(): Promise<string> {
    const skeleton = await fs.readFile("src/assets/cv-skeleton.tex", "utf8");
    const content = Object.keys(data).map((section) => mapSection(section as keyof CV)).join("\n");

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
 * @param table - The JSON table.
 * @param table.0 - The headings of the table.
 * @param table.1 - The rows of the table.
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
 * @param section - The section name.
 * @returns The LaTeX section.
 */
export function mapSection(section: keyof CV): string {
    if (section === "Bio")
        return format(data[section]);

    return `${mapSectionHeading(section)}\n${mapSectionContent(section)}`;
}

/**
 * Maps a subsection to LaTeX.
 * @param section - The section name.
 * @param subSection - The sub section name.
 * @returns The LaTeX subsection.
 */
function mapSubSection(section: keyof Omit<CV, "Bio">, subSection: string): string {
    return `${mapSubSectionHeading(subSection)}\n${mapSubSectionContent(section, subSection)}`;
}

/**
 * Maps a section heading to LaTeX.
 * @param heading - The heading name.
 * @returns The LaTeX section heading.
 */
function mapSectionHeading(heading: keyof Omit<CV, "Bio">): string {
    return `\\section*{${format(heading)}}`;
}

/**
 * Maps a subsection heading to LaTeX.
 * @param heading - The heading name.
 * @returns The LaTeX subsection heading.
 */
function mapSubSectionHeading(heading: string): string {
    return `\\subsection*{${format(heading)}}`;
}

/**
 * Maps a subsection content to LaTeX.
 * @param section - The section name.
 * @returns The LaTeX subsection content.
 */
function mapSectionContent(section: keyof Omit<CV, "Bio">): string {
    return Object.keys(data[section]).map((subSection) => mapSubSection(section, subSection)).join("\n");
}

/**
 * Maps a subsection content to LaTeX.
 * @param section - The section name.
 * @param subSection - The sub section name.
 * @returns The LaTeX subsection content.
 */
function mapSubSectionContent(section: keyof Omit<CV, "Bio">, subSection: string): string {
    const subSectionData = data[section][subSection]!;

    if (typeof subSectionData === "string")
        return format(subSectionData);

    if (typeof subSectionData === "object" && "summary" in subSectionData && typeof subSectionData.summary === "string")
        return format(subSectionData.summary);

    const filterGrade = (grade: string): string => Object.values(subSectionData)
        .map((exams: Record<string, string>) => Object.entries(exams)).flat()
        .filter(([, g]) => g === grade)
        .map(([subject]) => subject)
        .join(", ");

    return `${mapTable([
        [Object.keys(subSectionData)[0]!],
        [filterGrade("A*"), "A*"],
        [filterGrade("B"), "B"],
    ])}\\newline${mapTable([
        [Object.keys(subSectionData)[1]!],
        [filterGrade("8"), "8"],
        [filterGrade("7"), "7"],
    ])}`;
}

/**
 * Gets the CV in PDF format.
 * @returns The CV in PDF format.
 */
export async function GET(): Promise<NextResponse> {
    const tex = await generateTex();
    let pdf: Buffer | null = null;

    try {
        pdf = await pdflatex(tex);
    } catch (e: unknown) {
        void e;
    }

    return new NextResponse(pdf, { headers: { contentType: "application/pdf" } });
}
