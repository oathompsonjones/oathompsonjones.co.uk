import { NextResponse } from "next/server";
import cv from "assets/cv.json";
import fs from "fs/promises";
import pdflatex from "node-pdflatex";

export type CV = {
    Summary: string;
    Skills: string[];
    Qualifications: Record<string, Record<string, Record<string, string>> | { summary: string; grades: string[]; }>;
    Experience: Record<string, string>;
    Volunteering: Record<string, string>;
};

const data = cv as CV;

/**
 * Formats the content of the CV.
 * @param content - The content to format.
 * @returns The formatted content.
 */
function jsonToLaTeX(content: string): string {
    const markdownLink = /\[([^\]]+)\]\(([^\s)]+)\)/g;
    const newLine = /\n/g;
    const escapeCharacters = /([#&])/g;

    return content
        .replace(markdownLink, "\\href{$2}{$1}")
        .replace(newLine, " \\paragraph{}")
        .replace(escapeCharacters, "\\$1");
}

/**
 * Filters the object by the specified value.
 * @template T - The type of the value.
 * @param object - The object to filter.
 * @param value - The value to filter by.
 * @returns The filtered object.
 */
function filterByValue<T>(object: Record<string, T>, value: T): string[] {
    return Object.entries(object).filter(([, v]) => v === value).map(([k]) => k);
}

/**
 * Maps a table to LaTeX.
 * @param table - The table to map.
 * @returns The mapped table.
 */
function mapTable(table: string[][]): string {
    return `\\noindent\\begin{tabular}{ll}\n${[
        table[0]!.map((h) => (h.length > 0 ? `\\bfseries{${jsonToLaTeX(h)}}` : "")),
        ...table.slice(1),
    ].map((row) => `${row.map((column) => jsonToLaTeX(column)).join(" & ")} \\\\`).join("\n")
    }\n\\end{tabular}`;
}

/**
 * Generates a LaTeX document from the CV data.
 * @returns The LaTeX document.
 */
async function generateTex(): Promise<string> {
    const content = Object.keys(data).map((section) => {
        const sectionData = data[section as keyof CV];
        const heading = `\\section*{${jsonToLaTeX(section)}}`;
        let sectionContent = "";

        if (typeof sectionData === "string") {
            sectionContent = jsonToLaTeX(sectionData);
        } else if (Array.isArray(sectionData)) {
            sectionContent = `\\begin{center}\n${
                sectionData.map((item) => typeof item === "string" && jsonToLaTeX(item)).join(" $\\bullet$ ")
            }\n\\end{center}`;
        } else {
            sectionContent = Object.keys(sectionData).map((subSection) => {
                const subSectionData = sectionData[subSection];
                const subHeading = `\\subsection*{${jsonToLaTeX(subSection)}}`;
                let subSectionContent = "";

                if (typeof sectionData === "string" || Array.isArray(sectionData)) {
                    throw new Error("Sub section not found.");
                } else if (typeof subSectionData === "string") {
                    subSectionContent = jsonToLaTeX(subSectionData);
                } else if (typeof subSectionData === "object") {
                    if ("summary" in subSectionData && typeof subSectionData.summary === "string") {
                        subSectionContent = jsonToLaTeX(subSectionData.summary);
                    } else if ("A-Levels" in subSectionData && "GCSEs" in subSectionData) {
                        subSectionContent = `${mapTable([
                            ["A-Levels"],
                            [filterByValue(subSectionData["A-Levels"], "A*").join(", "), "A*"],
                            [filterByValue(subSectionData["A-Levels"], "B").join(", "), "B"],
                        ])}\n${mapTable([
                            ["GCSEs"],
                            [filterByValue(subSectionData.GCSEs, "8").join(", "), "8"],
                            [filterByValue(subSectionData.GCSEs, "7").join(", "), "7"],
                        ])}`;
                    }
                }

                return `${subHeading}\n${subSectionContent}`;
            }).join("\n");
        }

        return `${heading}\n${sectionContent}`;
    }).join("\n");

    const skeleton = await fs.readFile("src/assets/cv-skeleton.tex", "utf8");

    return skeleton.replace("%CONTENT%", content);
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
