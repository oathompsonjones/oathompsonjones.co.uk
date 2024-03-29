import cv from "assets/cv.json";
const data = cv as ICV;

export interface ICV {
    Qualifications: Record<string, string[][] | string>;
    Experience: Record<string, string>;
    Skills: Record<string, string>;
}

export function generateTex(content: string): string {
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
        "% Styles the title.\n" +
        "\\usepackage{xcolor}" +
        "\\usepackage{titling}\n" +
        "\t\\pretitle{\\centering\\vskip-2cm\\huge}\n" +
        "\t\\posttitle{\\par}\n" +
        "\t\\preauthor{\\centering}\n" +
        "\t\\postauthor{\\par}\n" +
        "\t\\predate{}\n" +
        "\t\\postdate{}\n" +
        "\t\\renewcommand\\maketitlehooka{\\par\\noindent{\\color{lightgray}\\hrulefill}\\par}\n" +
        "\t\\renewcommand\\maketitlehookb{\\par\\noindent{\\color{lightgray}\\hrulefill}\\par}\n" +
        "\n" +
        "% Style section sections.\n" +
        "\\usepackage[compact]{titlesec}\n" +
        "\\titleformat{\\section}\n" +
        "\t{\\color{black}\\normalfont\\large\\bfseries}{\\thesection}{0em}{}[{\\color{lightgray}\\titlerule\\titlerule}]\n" +
        "\\titleformat{\\subsection}\n" +
        "\t{\\color{black}\\normalfont}{\\thesubsection}{0em}{}[{\\color{lightgray}\\titlerule}]\n" +
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
        "\\maketitle\n" +
        "\\color{darkgray}" +
        `${content}\n` +
        "\\end{document}";
}

function format(content: string): string {
    return content
        .replace(/\[([^\]]+)\]\(([^\s)]+)\)/ug, "\\href{$2}{$1}")
        .replace(/\n/ug, " \\\\\n")
        .replace(/([#&])/ug, "\\$1")
        .replace(/\s-\s/ug, " --- ");
}

function mapTable([headings, ...rows]: string[][]): string {
    const arr = [headings!.map((heading) => (heading.length > 0 ? `\\bfseries{${format(heading)}}` : "")), ...rows];
    const lengths = arr[0]!.map((_, i) => Math.max(...arr.map((row) => format(row[i]!).length)));
    const mappedRows = arr.map((row) => `\t${row.map((column, i) => format(column).padEnd(lengths[i]!)).join(" & ")} \\\\`);
    return `\\begin{tabular}{llll}\n${mappedRows.join("\n")}\n\\end{tabular}`;
}

export function mapSection(section: keyof ICV): string {
    return `${mapSectionHeading(section)}\n${mapSectionContent(section)
        .split("\n").map((line) => `\t${line}`).join("\n")}`;
}

function mapSubSection(section: keyof ICV, subSection: string): string {
    return `${mapSubSectionHeading(subSection)}\n${mapSubSectionContent(section, subSection)
        .split("\n").map((line) => `\t${line}`).join("\n")}`;
}

function mapSectionHeading(heading: keyof ICV): string {
    return `\\section*{${format(heading)}}`;
}

function mapSubSectionHeading(heading: string): string {
    return `\\subsection*{${format(heading)}}`;
}

function mapSectionContent(section: keyof ICV): string {
    return Object.keys(data[section]).map((subSection) => mapSubSection(section, subSection)).join("\n");
}

function mapSubSectionContent(section: keyof ICV, subSection: string): string {
    const subSectionData = data[section][subSection]!;
    return subSectionData instanceof Array ? mapTable(subSectionData) : format(subSectionData);
}
