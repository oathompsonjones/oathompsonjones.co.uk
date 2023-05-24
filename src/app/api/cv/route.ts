import type { CV } from ".";
import { NextResponse } from "next/server";
import cv from "assets/cv.json";
import pdflatex from "node-pdflatex";

const data = cv as CV;

function generateTex(content: string): string {
    return "% Define the type of document.\n" +
        "\\documentclass[10pt, a4paper]{article}\n" +
        "\n" +
        "% Set a more sensible document size.\n" +
        "\\usepackage[margin=0.25in]{geometry}\n" +
        "\n" +
        "% Set the fonts.\n" +
        "\\usepackage[default]{lato}\n" +
        "\n" +
        "% Prevent words from being split accross lines.\n" +
        "\\tolerance=1\\emergencystretch=\\maxdimen\\hyphenpenalty=10000\\hbadness=10000\n" +
        "\n" +
        "% Prevent error from biber.\n" +
        "\\usepackage{biblatex}\n" +
        "\n" +
        "% Set up hyperlinks.\n" +
        "\\usepackage[hidelinks]{hyperref}\n" +
        "\n" +
        "% Allows the use of multiple columns.\n" +
        "\\usepackage{vwcol}\n" +
        "\n" +
        "% Removes numbers from sections and the contents page.\n" +
        "\\setcounter{secnumdepth}{0}\n" +
        "\n" +
        "% Remove page numbers.\n" +
        "\\pagenumbering{gobble}\n" +
        "\n" +
        "% Equivalent of <hr /> tag.\n" +
        "\\newcommand\\hr{\\par\\noindent\\hrulefill\\par}\n" +
        "\n" +
        "% Styles the title.\n" +
        "\\usepackage{titling}\n" +
        "\\pretitle{\\vspace{-1.75cm}\\huge}\n" +
        "\\posttitle{}\n" +
        "\\preauthor{\\begin{center}\\vspace{-0.3cm}}\n" +
        "\\postauthor{\\end{center}}\n" +
        "\\predate{}\n" +
        "\\postdate{\\vspace{-0.5cm}}\n" +
        "\\renewcommand\\maketitlehooka{\\hr}\n" +
        "\\renewcommand\\maketitlehookb{\\hr}\n" +
        "\\renewcommand\\maketitlehookc{}\n" +
        "\\renewcommand\\maketitlehookd{}\n" +
        "\n" +
        "% Style section sections.\n" +
        "\\usepackage[compact]{titlesec}\n" +
        "\\titleformat{\\section}\n" +
        "\t{\\normalfont\\large\\bfseries}{\\thesection}{0em}{}[\\titlerule\\titlerule]\n" +
        "\\titleformat{\\subsection}\n" +
        "\t{\\normalfont}{\\thesubsection}{0em}{}[\\titlerule]\n" +
        "\n" +
        "% Reduce line height in tables.\n" +
        "\\renewcommand{\\arraystretch}{1}\n" +
        "\n" +
        "% Sets the title.\n" +
        "\\title{Oliver Jones}\n" +
        "\\author{\n" +
        "\t\\href{mailto:oathompsonones@gmail.com}{oathompsonones@gmail.com}\n" +
        "\t$\\bullet$\n" +
        "\t07872 644095\n" +
        "\t$\\bullet$\n" +
        "\t\\href{https://oathompsonjones.co.uk}{oathompsonjones.co.uk}\n" +
        "}\n" +
        "\\date{}\n" +
        "\n" +
        "% Begin the document.\n" +
        "\\begin{document}\n" +
        `\\maketitle\n${content}\n\\end{document}`;
}

function formatChars(content: string): string {
    return content.replace(/([#&])/ug, "\\$1").replace(/\s-\s/ug, " --- ");
}

function mapTable([headings, ...rows]: string[][]): string {
    const arr = [headings!.map((heading) => (heading.length > 0 ? `\\bfseries{${formatChars(heading)}}` : "")), ...rows];
    const lengths = arr[0]!.map((_, i) => Math.max(...arr.map((row) => formatChars(row[i]!).length)));
    const mappedRows = arr.map((row) => `\t${row.map((column, i) => formatChars(column).padEnd(lengths[i]!)).join(" & ")} \\\\`);
    return `\\begin{tabular}{llll}\n${mappedRows.join("\n")}\n\\end{tabular}`;
}

function mapSection(section: string): string {
    return `${mapSectionHeading(section)}\n${mapSectionContent(section)
        .split("\n").map((line) => `\t${line}`).join("\n")}`;
}

function mapSubSection(section: string, subSection: string): string {
    return `${mapSubSectionHeading(subSection)}\n${mapSubSectionContent(section, subSection)
        .split("\n").map((line) => `\t${line}`).join("\n")}`;
}

function mapSectionHeading(heading: string): string {
    return `\\section*{${formatChars(heading)}}`;
}

function mapSubSectionHeading(heading: string): string {
    return `\\subsection*{${formatChars(heading)}}`;
}

function mapSectionContent(section: string): string {
    return Object.keys(data[section]!).map((subSection) => mapSubSection(section, subSection)).join("\n");
}

function mapSubSectionContent(section: string, subSection: string): string {
    const subSectionData = data[section]![subSection]!;
    return subSectionData instanceof Array ? mapTable(subSectionData) : formatChars(subSectionData);
}

export async function GET(): Promise<NextResponse> {
    const tex = generateTex(Object.keys(data).map(mapSection).join("\n"));
    const pdf = await pdflatex(tex);
    return new NextResponse(pdf, { headers: { contentType: "application/pdf" } });
}
