import { NextResponse } from "next/server";
import cv from "assets/cv.json";
import fs from "fs/promises";
import pdflatex from "node-pdflatex";

type Project = {
    title: string;
    link?: string;
    tools: string[];
    description: string[] | string;
};

type Experience = {
    role: string;
    organisation: string;
    time: string;
    description: string[];
};

export type CV = {
    Summary: string;
    Skills: {
        Languages: string[];
        Technologies: string[];
        Other: string[];
    };
    Qualifications: Array<{
        institution: string;
        time: string;
        grades: Record<string, Record<string, string>> | string[];
        summary?: string[];
        projects?: Project[];
    }>;
    Projects: Project[];
    Experience: Experience[];
    Volunteering: Experience[];
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
        .replace(newLine, "\n\n")
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
 * @param spacing - The spacing to use.
 * @returns The mapped table.
 */
function mapTable(table: string[][], spacing: string): string {
    return `\\noindent\\begin{tabularx}{\\linewidth}{${spacing}}\n${table
        .map((row) => `${row.map((column) => jsonToLaTeX(column)).join(" & ")} \\\\`).join("\n")
    }\n\\end{tabularx}`;
}

/**
 * Maps a list to LaTeX.
 * @param list - The list to map.
 * @returns The mapped list.
 */
function mapList(list: string[]): string {
    // Inline list if all items are short
    if (list.every((item) => item.split(" ").length <= 2))
        return list.map((item) => jsonToLaTeX(item)).join(" \\spacer ");

    // Otherwise, use itemize
    return `\\begin{itemize}[noitemsep]\n${list
        .map((item) => `\\item ${jsonToLaTeX(item)}`).join("\n")}\n\\end{itemize}`;
}

/**
 * Generates a LaTeX document from the CV data.
 * @returns The LaTeX document.
 */
async function generateTex(): Promise<string> {
    const skeleton = await fs.readFile("src/assets/cv-skeleton.tex", "utf8");
    let content = "";

    // Helper functions

    const mapProject = (project: Project): string => {
        const title = project.link === undefined
            ? jsonToLaTeX(project.title)
            : jsonToLaTeX(`[${project.title}](${project.link})`);
        const tools = jsonToLaTeX(project.tools.join("/"));
        const description = typeof project.description === "string"
            ? ` — ${jsonToLaTeX(project.description)}`
            : mapList(project.description);

        return `\\textbf{${title}} \\textit{[${tools}]}${description}`;
    };

    const mapExperience = (section: Experience): string => {
        const role = jsonToLaTeX(section.role);
        const organisation = section.organisation.length > 0 ? `, ${jsonToLaTeX(section.organisation)}` : "";
        const time = jsonToLaTeX(section.time);
        const description = mapList(section.description);

        return `\\subsection*{${jsonToLaTeX(`${role}${organisation} — ${time}`)}}\n${jsonToLaTeX(description)}`;
    };

    // Add the summary
    content += `\\section*{Summary}\n${jsonToLaTeX(data.Summary)}\n`;

    // Add the skills
    content += "\\section*{Skills}\n";
    content += `\\paragraph*{Languages}\n${mapList(data.Skills.Languages)}\n`;
    content += `\\paragraph*{Technologies}\n${mapList(data.Skills.Technologies)}\n`;
    content += `\\paragraph*{Other}\n${mapList(data.Skills.Other)}\n`;

    // Add the qualifications

    content += "\\section*{Qualifications}\n";
    for (const qualification of data.Qualifications) {
        content += `\\subsection*{${jsonToLaTeX(qualification.institution)} — ${jsonToLaTeX(qualification.time)}}\n`;

        // Add the summary if it exists
        if ("summary" in qualification) {
            content += `\\subsubsection*{${jsonToLaTeX(qualification.summary[0]!)}}\n`;
            content += mapList(qualification.summary.slice(1));
        }

        // Add the projects if they exist
        if ("projects" in qualification)
            content += `\\subsubsection*{Relevant Work}\n${mapList(qualification.projects.map(mapProject))}\n`;

        // Otherwise, add the grades
        if ("A Levels" in qualification.grades && "GCSEs" in qualification.grades) {
            content += mapTable([
                ["\\textbf{A Levels}"],
                [mapList(filterByValue(qualification.grades["A Levels"], "A*")), "A*"],
                [mapList(filterByValue(qualification.grades["A Levels"], "B")), "B"],
                ["\\textbf{GCSEs}"],
                [mapList(filterByValue(qualification.grades.GCSEs, "8")), "8"],
                [mapList(filterByValue(qualification.grades.GCSEs, "7")), "7"],
            ], "Xl");
        }
    }

    // Add the projects
    content += "\\section*{Projects}\n";
    content += mapList(data.Projects.map(mapProject));

    // Add the experience and volunteering
    content += "\\section*{Experience}\n";
    content += data.Experience.map(mapExperience).join("\n");
    content += "\\section*{Volunteer Experience}\n";
    content += data.Volunteering.map(mapExperience).join("\n");

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
