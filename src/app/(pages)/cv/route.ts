import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import cv from "assets/cv.json" with { type: "json" };
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
    ignoreOnSinglePage?: boolean;
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
        dissertation?: Project;
    }>;
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
 * Maps a project to LaTeX.
 * @param project - The project to map.
 * @returns The mapped project.
 */
function mapProject(project: Project): string {
    const title = project.link === undefined
        ? jsonToLaTeX(project.title)
        : jsonToLaTeX(`[${project.title}](${project.link})`);
    const tools = jsonToLaTeX(project.tools.join("/"));
    const description = typeof project.description === "string"
        ? ` — ${jsonToLaTeX(project.description)}`
        : mapList(project.description);

    return `\\textbf{${title}} \\textit{[${tools}]}${description}`;
}

/**
 * Maps an experience section to LaTeX.
 * @param section - The experience section to map.
 * @param singlePage - Whether to generate the CV as a single page.
 * @returns The mapped experience section.
 */
function mapExperience(section: Experience, singlePage: boolean): string {
    if (singlePage && (section.ignoreOnSinglePage ?? false))
        return "";

    const role = jsonToLaTeX(section.role);
    const organisation = section.organisation.length > 0 ? `, ${jsonToLaTeX(section.organisation)}` : "";
    const time = jsonToLaTeX(section.time);
    const description = mapList(section.description);

    return `\\subsection*{${jsonToLaTeX(`${role}${organisation} — ${time}`)}}\n${jsonToLaTeX(description)}`;
}

/**
 * Generates a LaTeX document from the CV data.
 * @param singlePage - Whether to generate the CV as a single page.
 * @returns The LaTeX document.
 */
// eslint-disable-next-line max-statements
async function generateTex(singlePage: boolean = false): Promise<string> {
    const skeleton = await fs.readFile("src/assets/cv-skeleton.tex", "utf8");
    let content = "";

    // Add the summary
    content += `\\section*{Summary}\n${jsonToLaTeX(data.Summary)}\n`;

    // Add the skills
    content += "\\section*{Skills}\n";
    for (const skill of Object.keys(data.Skills)) {
        if (data.Skills[skill as keyof typeof data.Skills].length > 0)
            content += `\\paragraph*{${skill}}\n${mapList(data.Skills[skill as keyof typeof data.Skills])}\n`;
    }

    // Add the experience
    content += "\\section*{Experience}\n";
    content += data.Experience.map((exp) => mapExperience(exp, singlePage)).join("\n");

    // Add the qualifications
    content += "\\section*{Qualifications}\n";
    for (const qualification of singlePage ? data.Qualifications.slice(0, 1) : data.Qualifications) {
    content += `\\subsection*{${jsonToLaTeX(qualification.institution)} — ${jsonToLaTeX(qualification.time)}}\n`;

        if (singlePage && "summary" in qualification && qualification.summary[0] !== undefined)
            content += `${jsonToLaTeX(qualification.summary[0])}\n`;

        // Add the summary if it exists
        if (!singlePage && "summary" in qualification) {
            content += `\\subsubsection*{${jsonToLaTeX(qualification.summary[0]!)}}\n`;
            content += mapList(qualification.summary.slice(1));
        }

        // Add the dissertation if it exists
        if (!singlePage && "dissertation" in qualification)
            content += `\\subsubsection*{Dissertation}\n${[qualification.dissertation].map(mapProject)}\n`;

        // Otherwise, add the grades
        if (!(qualification.grades instanceof Array)) {
            const table: string[][] = [];

            for (const type of Object.keys(qualification.grades)) {
                table.push([`\\textbf{${type}}`]);
                const grades = qualification.grades[type]!;

                for (const grade of Array.from(new Set(Object.values(grades))))
                    table.push([mapList(filterByValue(grades, grade)), grade]);
            }

            content += mapTable(table, "Xl");
        }
    }

    // Add the volunterring
    if (!singlePage) {
        content += "\\section*{Volunteer Experience}\n";
        content += data.Volunteering.map((vol) => mapExperience(vol, singlePage)).join("\n");
    }

    return skeleton.replace("%CONTENT%", content);
}

/**
 * Gets the CV in PDF format.
 * @param req - The request object.
 * @returns The CV in PDF format.
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
    const singlePage = req.nextUrl.searchParams.get("singlePage") !== null;
    const tex = await generateTex(singlePage);
    const pdf = await pdflatex(tex, { texInputs: ["src/assets/"] });

    return new NextResponse(pdf as BodyInit, { headers: { contentType: "application/pdf" } });
}
